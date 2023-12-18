import React, { useState, useEffect } from 'react'
import { VscChromeClose, VscFile } from 'react-icons/vsc'

const CommandPalette = ({getFileNames, getNode, setCurrentFile, setShowCommandPalette}) => {
  const [search, setSearch] = useState('')
  const allFiles = getFileNames()
  const [files, setFiles] = useState(allFiles)
  console.log(files)
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
  return (
    <div className='absolute w-full flex justify-center text-sm'>
      <div className='bg-[#252526] flex flex-col p-2 pt-3 w-[30vw] rounded-md mt-3 shadow-2xl'>
        <div className='w-full flex flex-1 items-center'>
          <input type="text" autoFocus className='p-1 rounded bg-[#2a2d2e] text-white outline outline-1 outline-slate-400 w-full' onChange={(e) => setSearch(e.target.value)} placeholder='Search file by name' />
          <VscChromeClose className='m-1 cursor-pointer' onClick={() => setShowCommandPalette(false)} color='white' />
        </div>
        <div className='flex flex-col gap-1 text-white py-1 overflow-y-auto no-scrollbar'>
            {files.map((file, idx) => {
              return (<span className='flex gap-2 items-center cursor-pointer p-1 hover:bg-[#2a2d2e] first:mt-1.5' onClick={() => handleClick(file)}><VscFile /> {file}</span>)
            })}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
