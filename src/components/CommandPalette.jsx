import React, { useState, useEffect, useRef } from 'react'
import { VscChromeClose, VscFile } from 'react-icons/vsc'

const CommandPalette = ({getFileNames, getNode, setCurrentFile, setShowCommandPalette}) => {
  const [search, setSearch] = useState('')
  const allFiles = getFileNames()
  const [files, setFiles] = useState(allFiles)
  useEffect(() => {
    const filteredFiles = allFiles.filter((file) =>
      file.toLowerCase().includes(search.toLowerCase())
    );
    setFiles(filteredFiles);
  }, [search]);
  const handleClick = (file) => {
    const Node = getNode(file)
    setCurrentFile(Node)
    setShowCommandPalette(false)
  }
  const handlekeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick(files[0])
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setShowCommandPalette(false)
    }
  }
  const innerDivRef = useRef()
  const handleOuterClick = (e) => {
    // Check if the click target is the outer div itself
    if (innerDivRef.current && innerDivRef.current.contains(e.target)) {
      // Clicked inside the outer div
      // Do something if needed
    } else {
      // Clicked outside the outer div
      // Close the command palette
      setShowCommandPalette(false);
    }
  };
  return (
    <div className='absolute w-full min-h-screen flex justify-center text-sm outer' onClick={(e) => handleOuterClick(e)}>
      <div>
        <div className='bg-[#252526] flex flex-col p-2 pt-3 w-[30vw] rounded-md mt-3 shadow-2xl inner' ref={innerDivRef} >
          <div className='w-full flex flex-1 items-center'>
            <input type="text" autoFocus className='p-1 rounded bg-[#2a2d2e] text-white outline outline-1 outline-[#1b5fb2] w-full' onKeyDown={(e) => handlekeyDown(e)} onChange={(e) => setSearch(e.target.value)} placeholder='Search file by name' />
            {/* <VscChromeClose className='m-1 cursor-pointer' onClick={() => setShowCommandPalette(false)} color='white' /> */}
          </div>
          <div className='flex flex-col gap-1 text-white py-1 overflow-y-auto no-scrollbar'>
              {files.map((file, idx) => {
                return (<span key={idx} className='flex gap-2 items-center cursor-pointer p-1 hover:bg-[#2a2d2e] first:mt-1.5' onClick={() => handleClick(file)}><VscFile /> {file}</span>)
              })}
              {files.length === 0 &&
              (<span className='flex gap-2 items-center cursor-pointer p-1 mt-1 rounded pl-3 bg-[#345986]'>No Matching Results</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
