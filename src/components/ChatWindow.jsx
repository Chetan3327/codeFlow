import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { VscLoading } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown'

const PYTHON_URL = process.env.REACT_APP_PYTHON_URL
const ChatWindow = ({setShowChatWindow, getFileNames, getNode}) => {
  const [width, setWidth] = useState('50%')
  const [height, setHeight] = useState('60%')
  const [query, setQuery] = useState("")
  const [context, setContext] = useState("")
  const [loading, setLoading] = useState(false)
  const data = [
    {
      message: 'Hi! How can I help you today?',
      role: 'ai'
    }
  ]
  const [chatData, setChatData] = useState(JSON.parse(localStorage.getItem('chat')) || data)
  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chatData))
  }, [chatData])


  const chatContainerRef = useRef(null)
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      conversation()
    }
  }

  const conversation = () => {
    console.log('object')
    if(!query){
      return
    }
    setQuery("")
    setChatData((chatData) => [...chatData, {message: query, role: 'user'}])
    console.log({
      "history": "string",
      "input": context + query,
      "memory": [
        {}
      ]
    })
    setLoading(true)
    axios.post(`${PYTHON_URL}/conversation_chain.conversation/run`, {
      "history": "string",
      "input": context + query,
      "memory": [
        {}
      ]
    }).then((response) => {
      console.log(response.data)
      setLoading(false)
      setChatData((chatData) => [...chatData, {message: response.data.output, role: 'ai'}])
    })
  }
  useEffect(() => {
    console.log('scroll')
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [chatData])
  const toggleSize = () => {
    if(width === '50%'){
      setWidth('25%')
      setHeight('70%')
    }else{
      setWidth('50%')
      setHeight('60%')
    }
  }
  const clearChat = () => {
    setChatData(data)
  }
  const handleFileChange = (e) => {
    const {name, value} = e.target
    console.log(name, value)
    if(value === ''){
      setContext('')
      return
    }
    const node = getNode(value)
    console.log(node)
    setContext(node.code)
  }
  return (
    <Draggable handle='.drag-handle'>
      <div className='absolute bg-[#0e0e16] z-40 shadow-[#1c1b2d] shadow-2xl text-white' style={{width, height}}>
        <div className='flex flex-col justify-between h-full'>
          <div className='bg-[#1c1b2d] w-full flex items-center gap-1 pl-2 cursor-move drag-handle py-1.5'>
            <button onClick={() => setShowChatWindow(false)} className='p-1.5 bg-red-600 rounded-full'></button>
            <button onClick={() => toggleSize()} className='p-1.5 bg-yellow-600 rounded-full'></button>
            <button onClick={() => clearChat()} className='p-1.5 bg-green-600 rounded-full'></button>
            <span className='text-gray-500 pl-2'>Luna</span>
          </div>
          <div className='h-full flex flex-col my-4 overflow-y-auto no-scrollbar' ref={chatContainerRef}>
            {chatData.map((chat, idx) => {
              return (<MessageCard key={idx} message={chat.message} role={chat.role} />)
            })}
            {loading && (<span className='px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#1c1b2d] text-left'><VscLoading className='animate-spin' /></span>)}
          </div>
          <div className='w-full flex p-1'>
            <input type="text" onKeyDown={(e) => handleKeyDown(e)} value={query} onChange={(e) => setQuery(e.target.value)} className='w-full p-2 outline-none bg-[#1c1b2d] rounded-md' placeholder='Message Luna...' />
            <select className='bg-[#1c1b2d] ml-1 rounded px-2' name="filename" onChange={(e) => handleFileChange(e)}>
              <option value="">Select File</option>
              {getFileNames().map((filename, idx) => {
                return (<option key={idx} value={filename}>{filename}</option>)
              })}
            </select>
            <button onClick={() => conversation()} className='px-4 p-2 bg-[#6a4afe] rounded-lg ml-1'>send</button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

const MessageCard = ({message, role}) => {
  return (<span className={`px-4 py-2 my-1 mx-2 rounded-bl-lg bg-[#${role === 'user' ? '112130' : '1c1b2d'}] text-${role === 'user' ? 'right' : 'left'}`}><ReactMarkdown>{message}</ReactMarkdown></span>)
}

export default ChatWindow
