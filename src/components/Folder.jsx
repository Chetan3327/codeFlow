import React, { useState } from 'react'
import { VscFile, VscFolder, VscFolderOpened, VscNewFile, VscNewFolder } from "react-icons/vsc";
import { DiHtml5, DiJavascript1 } from "react-icons/di";
import { MdDelete } from "react-icons/md";
const Folder = ({data, handleInsertNode, setCurrentFile, handleDeleteNode, currentFile}) => {
    const isCurrentFile = currentFile && (currentFile.id === data.id)
    const getFileLogo = (ext) => {
        switch(ext){
            case 'html':
                return <DiHtml5 size={15} />
            case 'js':
                return <DiJavascript1 size={15} />
            default:
                return null
        }        
    }
    const [open, setOpen] = useState(true)
    const [showInput, setShowInput] = useState({visible: false, isFolder: null})
    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation()
        setOpen(true)
        setShowInput({visible: true, isFolder})
    }
    const addNewFolder = (e) => {
        if(e.keyCode === 13 && e.target.value){
            handleInsertNode(data.id, e.target.value, showInput.isFolder)
            setShowInput({...showInput, visible: false})
        }
    }
    if(data.isFolder){
        return (
            <div className='text-sm'>
                <div className='group/controls flex gap-1 items-center cursor-pointer pl-1 py-0.5 hover:bg-[#2a2d2e]' onClick={() => setOpen(!open)}>
                    {open ? <VscFolderOpened /> : <VscFolder />}<span className='truncate'>{data.name}</span>
                    <div className='group-hover/controls:visible invisible flex gap-1 pl-2 items-center'>
                        <button onClick={(e) => handleNewFolder(e, false)}><VscNewFile /></button>
                        <button onClick={(e) => handleNewFolder(e, true)}><VscNewFolder /></button>
                    </div>
                </div>
                <div className='pl-5' style={{display: open ? 'block' : 'none'}}>
                    {showInput.visible && (
                    <div className='flex gap-1 items-center'>
                        <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
                        <input className='bg-[#3c3c3c] pl-1 py-0.5 text-white' autoFocus onBlur={() => setShowInput({...showInput, visible: false})} onKeyDown={(e) => addNewFolder(e)} type="text" />
                    </div>)}
                    {data.items.map((item, idx) => {
                        return (<Folder key={idx} data={item} currentFile={currentFile} setCurrentFile={setCurrentFile} handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} />)
                    })}
                </div>
            </div>
        )
    }else{
        return(<span className='flex gap-1 items-center cursor-pointer pl-1 py-0.5 hover:bg-[#2a2d2e]' style={{backgroundColor: isCurrentFile ? '#37373d' : ''}} onClick={() => setCurrentFile(data)}>{getFileLogo(data.name.split('.')[1]) || <VscFile />}<span className='truncate'>{data.name}</span></span>)
    }
}

export default Folder
