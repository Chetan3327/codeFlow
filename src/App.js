import React, { useState } from 'react'
// import folderData from './data/folderData'
import {htmlCode} from './data/folderData'
import Folder from './components/Folder'
import useTreeTraversal from './hooks/useTreeTraversal'
import { Editor } from '@monaco-editor/react'
import { VscChromeClose, VscChevronRight, VscChevronLeft, VscCode, VscPlay, VscSave, VscSaveAll, VscCircleFilled, VscHubot, VscRecordKeys, VscJson } from "react-icons/vsc";
import axios from 'axios'
import {linkTagRegex, scriptTagRegex} from './utils/regex'
import {detectLanguage} from './utils/detectLanguage'
import Overlay from './components/Overlay'
import ChatWindow from './components/ChatWindow'
// import prettier from 'prettier/standalone';
// import parserBabel from 'prettier/parser-babel';

const PYTHON_URL = process.env.REACT_APP_PYTHON_URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const App = () => {
  // folderData for palm inner code
  const [explorerData, setExplorerData] = useState(JSON.parse(localStorage.getItem('htmlCode')) || htmlCode)
  const [currentFile, setCurrentFile] = useState(null)
  const [showOutputPane, setShowOutPane] = useState(false)
  const [showExplorer, setShowExplorer] = useState(true)
  const [showChatWindow, setShowChatWindow] = useState(true)
  const [icon, setIcon] = useState(<VscChromeClose />)
  const [showOverlay, setShowOverlay] = useState(false)
  const [srcDoc, setSrcDoc] = useState(`
    <!DOCTYPE html>
    <html style="height:100%">
        <head>
            <meta charset="UTF-8" />
        </head>
        <body style="height:100%">No Output</body>
    </html>
  `)
  const calculateWidth = () => {
    if(showExplorer && showOutputPane){
      return '65vw'
    }
    if(showExplorer && !showOutputPane){
      return '85vw'
    }
    if(!showExplorer && showOutputPane){
      return '80vw'
    }
    return '100vw'
  }
  const {insertNode, updateNode, findNode, deleteNode, getAllFileNames} = useTreeTraversal()
  const handleInsertNode = (folderId, item, isFolder) => {
    const updatedTree = insertNode(explorerData, folderId, item, isFolder)
    setExplorerData(updatedTree)
    localStorage.setItem('htmlCode', JSON.stringify(updatedTree))
  }
  const handleDeleteNode = (targetId) => {
    if(currentFile?.id === targetId){
      setCurrentFile(null)
    }
    if(targetId === '2'){
      return;
    }
    const updatedTree = deleteNode(explorerData, targetId)
    setExplorerData(updatedTree)
    localStorage.setItem('htmlCode', JSON.stringify(updatedTree))
  }
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault()
      setShowExplorer(!showExplorer)
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'o'){
      e.preventDefault()
      setShowOutPane(!showOutputPane)
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's'){
      e.preventDefault()
      if(!currentFile) return
      saveCode()
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'q'){
      e.preventDefault()
      setCurrentFile(null)
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k'){
      e.preventDefault()
      setShowOverlay(true)
    }
    if(e.key === 'Escape'){
      setShowOverlay(false)
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'e'){
      e.preventDefault()
      setShowChatWindow(!showChatWindow)
    }
    if (e.key === 'Delete'){
      e.preventDefault()
      if(!currentFile) return
      handleDeleteNode(currentFile.id)
    }
  }
  const handleInput = (value) => {
    setCurrentFile({...currentFile, code: value})
    setIcon(<VscCircleFilled />)
  }
  const saveAll = (data) => {
    localStorage.setItem('htmlCode', JSON.stringify(data || explorerData))
  }
  const saveCode = () => {
    const updatedTree = updateNode(explorerData, currentFile.id, currentFile.code)
    setExplorerData(updatedTree)
    setIcon(<VscChromeClose />)
    localStorage.setItem('htmlCode', JSON.stringify(updatedTree))
    compileCode()
  }

  const codeComplete = () => {
    axios.post(`${PYTHON_URL}/llm_chain.chain/run`, {code: currentFile.code, file_name: currentFile.name}).then((response) => {
      console.log(response.data.output)
      // const code = currentFile.code + '\n' + response.data.output
      const code = response.data.output
      setCurrentFile({...currentFile, code: code})
    })
  }

  const compileCode = () => {
    setShowOutPane(true)
    if(currentFile.name.split('.')[1] === 'py'){
      axios.post(`${BACKEND_URL}/execute/python`, {code: currentFile.code}).then((response) => {
        console.log(response)
        console.log(response.data.output)
        setSrcDoc(`
        <!DOCTYPE html>
        <html style="height:100%">
            <head>
                <meta charset="UTF-8" />
                <link href="https://fonts.cdnfonts.com/css/cascadia-code" rel="stylesheet">
            </head>
            <body style="height:100%; background-color: black; color: white">${response.data.output}</body>
        </html>`)
      })
      return
    }
    // saveCode()
    const result = findNode(explorerData, 'index.html')
    let htmlCode = result.code
    console.log(htmlCode)
    setSrcDoc(htmlCode)
    console.log(htmlCode.includes('link'))

    console.log(typeof(result.code))
   
    const matches = [...htmlCode.matchAll(linkTagRegex)];
    console.log(matches)

    if(matches){
      const cssFileNames = matches.map((match) => match[1])
      console.log(cssFileNames)
      cssFileNames.map((fileName) => {
        const cssFileNode = findNode(explorerData, fileName);
        htmlCode = htmlCode.replace('</head>', `<style>${cssFileNode.code}</style></head>`);
      })
      console.log(htmlCode)
      // setSrcDoc(htmlCode)
    
    }

    const jsMatches = [...htmlCode.matchAll(scriptTagRegex)];
    console.log(jsMatches)

    if(jsMatches){
      const jsFileNames = jsMatches.map((match) => match[1])
      console.log(jsFileNames)
      jsFileNames.map((fileName) => {
        const jsFileNode = findNode(explorerData, fileName);
        htmlCode = htmlCode.replace('</body>', `<script>${jsFileNode.code}</script></body>`);
      })
      console.log(htmlCode)
      setSrcDoc(htmlCode)
    }
  }
  const formatCode = () => {
    console.log(currentFile.code)
  }
  const getFileNames = () => {
    const fileNames = getAllFileNames(explorerData)
    return fileNames
  }
  const getNode = (fileName) => {
    const node = findNode(explorerData, fileName)
    return node
  }
  
  return (
    <div className='flex min-h-screen bg-[#1e1e1e]' onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}> 
      <button className='absolute bottom-0 left-0 p-2 bg-[#282828] text-white z-10' onClick={() => setShowExplorer(!showExplorer)}>{showExplorer ? <VscChevronLeft /> : <VscChevronRight /> }</button>
      {showExplorer &&
      (<div className='bg-[#282828] text-white flex flex-col py-5 pl-3 gap-2 w-[15vw]'>
        <h3 className='text-md text-gray-500 flex gap-2 items-center'><VscCode color='cyan' size={30} />CodeFlow</h3>
        <Folder data={explorerData} handleInsertNode={handleInsertNode} currentFile={currentFile} setCurrentFile={setCurrentFile} handleDeleteNode={handleDeleteNode} />
      </div>)}
      {currentFile ? (
      <div className='flex-1 text-white'>
          <div style={{width: calculateWidth()}} className={`h-[5vh] bg-[#282828] flex justify-between`}>
              <button className='text-white text-sm h-[5vh] px-4 bg-[#1e1e1e] flex items-center gap-2' onClick={() => setCurrentFile(null)}>{currentFile.name} {icon}</button>
              <div className='flex gap-4 last:pr-4'>
                <button title='run' onClick={() => compileCode()}><VscPlay /></button>
                <button onClick={() => codeComplete()}><VscHubot /></button>
                <button title='save' onClick={() => saveCode()}><VscSave /></button>
                <button onClick={() => saveAll()}><VscSaveAll /></button>
                <button onClick={() => formatCode()}><VscJson /></button>
                <button onClick={() => setShowOverlay(true)}><VscRecordKeys /></button>
              </div>
          </div>
          <Editor height='95vh' value={currentFile.code} onChange={(value) => handleInput(value)} width={calculateWidth()} language={detectLanguage(currentFile.name.split('.')[1])} theme='vs-dark'/>
      </div>) : (<div className='flex items-center justify-center w-full text-white'>No file Selected</div>)}
      <button className='absolute bottom-0 right-0 p-2 bg-[#282828] text-white z-10' onClick={() => setShowOutPane(!showOutputPane)}>{showOutputPane ? <VscChevronRight /> : <VscChevronLeft /> }</button>
      {showOutputPane &&
      (<div className='bg-white w-[20vw] absolute top-0 right-0 h-[100vh]'>
          <iframe className='w-full h-full' title='output' aria-label='Preview' sandbox='allow-scripts' srcDoc={srcDoc}></iframe>
      </div>)}

      {showOverlay && <Overlay setShowOverlay={setShowOverlay} />}
      {showChatWindow && <ChatWindow setShowChatWindow={setShowChatWindow} getFileNames={getFileNames} getNode={getNode} />}
    </div>
  )
}

export default App