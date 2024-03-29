import React, { useState } from 'react'
import { DiHtml5, DiJavascript1, DiPython } from 'react-icons/di'
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom'
import {htmlCode, pythonCode, jsCode, EmptyCode} from '../data/folderData'
import { VscAdd, VscFile } from 'react-icons/vsc';
import { MdDelete } from 'react-icons/md';

const New = () => {
  let createdProjectsIds = JSON.parse(localStorage.getItem('createdProjects')) || [];

  if (!Array.isArray(createdProjectsIds)) {
    createdProjectsIds = [];
    localStorage.setItem('createdProjects', JSON.stringify(createdProjectsIds));
  }
  
  const createdProjects = createdProjectsIds.map((id) => JSON.parse(localStorage.getItem(id)));
  
  console.log(createdProjects)
  const types = [
    {
      type: "HTML",
      data: htmlCode
    },
    {
      type: "PYTHON",
      data: pythonCode
    },
    {
      type: "JS",
      data: jsCode
    },
    {
      type: "Empty",
      data: EmptyCode
    }
  ]
  const getLogo = (language) => {
    switch(language){
      case "HTML":
        return <DiHtml5 color='white' size={100} />
      case "PYTHON":
        return <DiPython color='white' size={100} />
      case "JS":
        return <DiJavascript1 color='white' size={100} />
      case "Empty":
        return <VscFile color='white' size={100} />
      default:
        return <VscFile color='white' size={100} />
    }
  }
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState("")
  const [showOverlay, setShowOverlay] = useState(false)
  const CreateNew = () => {
    const id = uuidv4()
    if(!name || !type){
      setError("Required Fields Missing!")
      return
    }
    const matching = types.find((entry) => entry.type === type)
    const data = matching.data
    const value = {
      id: id,
      name: name,
      type: type,
      data: data,
      chat: [
        {
          message: 'Hi! How can I help you today?',
          role: 'ai'
        }
      ]
    }
    localStorage.setItem(id, JSON.stringify(value))
    const createdProjects = JSON.parse(localStorage.getItem('createdProjects'))
    if(!createdProjects){
      localStorage.setItem('createdProjects', JSON.stringify(`['${id}']`))
      navigate(`/${id}`)
      return
    }
    createdProjects.push(id)
    localStorage.setItem('createdProjects', JSON.stringify(createdProjects))
    navigate(`/${id}`)
  }
  const deleteProject = (e, Projectid) => {
    e.stopPropagation()
    const createdProjectsIds = JSON.parse(localStorage.getItem('createdProjects'))
    const updatedProjects = createdProjectsIds.filter((id) => id !== Projectid)
    localStorage.setItem('createdProjects', JSON.stringify(updatedProjects))
    localStorage.removeItem(Projectid)
  }
  const handleOpen = (type) => {
    console.log(type)
    setType(type)
    setShowOverlay(true)
    setError("")
  }
  return (
    <div className='flex flex-col min-h-screen items-center bg-[#1e1e1e]'> 
      {/* tempelate */}
      <div className='bg-[#282828] w-[90%] mt-20 p-5'>
        <h3 className='text-white text-2xl mb-3'>Create New Project</h3>
        <div className=' flex flex-wrap gap-5'>
          <div className='bg-[#37373d] p-10 cursor-pointer rounded hover:shadow-xl shadow-white'  onClick={() => {setShowOverlay(true)
            setError("")}}>
            <VscAdd color='white' size={100} />
          </div>
          {types.map((type, idx) => {
            return (
              <div key={idx} className='bg-[#37373d] p-10 cursor-pointer rounded hover:shadow-xl shadow-white'  onClick={() => handleOpen(type.type)}>
                {getLogo(type.type)}
              </div>
            )
          })}
        </div>
      </div>

      {/* createdProjects */}
      <div className='bg-[#282828] w-[90%] my-10 p-5'>
        <h3 className='text-white text-2xl mb-3'>Created Projects</h3>
        <div className='flex flex-wrap gap-5'>
          {createdProjects.map((project, idx) => {
            return (
              <div key={idx} onClick={() => navigate(`/${project.id}`)} className='group/delete bg-[#37373d] p-10 cursor-pointer rounded hover:shadow-xl shadow-white flex flex-col items-center relative'>
                <MdDelete color='white' className='group-hover/delete:visible invisible absolute top-0 right-0 mt-2 mr-2' onClick={(e) => deleteProject(e, project.id)} />
                {getLogo(project.type)}
                <span className='text-white'>{project.name}</span>
              </div>
            )
          })}
          {createdProjects.length === 0 && (<p className='text-white'>No Projects Yet.</p>)}
        </div>
      </div>
 
      {showOverlay && (<CreateNewOverlay setName={setName} error={error} type={type} setType={setType} types={types} CreateNew={CreateNew} setShowOverlay={setShowOverlay} />)}

      <Footer /> 
    </div>
  )
}

const CreateNewOverlay = ({setName, setType, types, CreateNew, setShowOverlay, type, error}) => {
  return (
    <div className='absolute min-h-screen w-full flex items-center justify-center z-50 bg-black/80 bg-blend-overlay'>
      <div className='p-10 bg-[#282828] flex flex-col mb-32 gap-3 md:w-[30vw] w-[90vw]'>
        <input autoFocus type="text" className='p-2 rounded bg-[#2a2d2e] text-white w-full' placeholder='Name of Project' onChange={(e) => setName(e.target.value)} />
        <select className='bg-[#37373d] rounded p-2 text-white' onChange={(e) => setType(e.target.value)} value={type} >
          <option value="">Select Template</option>
          {types.map((type, idx) => {
            return (<option key={idx} value={type.type}>{type.type}</option>)
          })}
        </select>
        <div className='flex flex-col md:flex-row gap-2 w-full'>
          <button className='text-white px-4 p-2 bg-black rounded-md w-full' onClick={() => CreateNew()}>Create</button>
          <button className='px-4 p-2 bg-white text-black rounded-md w-full' onClick={() => setShowOverlay(false)}>Cancel</button>
        </div>
        {error && (<p className='p-2 rounded-md border-[1px] border-red-600 bg-red-200 text-center'>{error}</p>)}
      </div>
    </div>
  )
}

const Footer = () => {
  return(
    <div className='fixed bottom-0 p-3 px-5 bg-[#282828] w-full text-white'>
      <div className='flex justify-between'>
        CodeFlow.
        <div className="flex gap-3">
          <a href="https://www.linkedin.com/in/chetan-chauhan-860106258/" target='_blank' rel='noreferrer'>
              <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
          </a>
          <a href="mailto:chauhanchetan12789@gmail.com" target='_blank' rel='noreferrer'>
              <img src="https://img.shields.io/badge/Gmail-red?style=for-the-badge&logo=Gmail&logoColor=white" alt="Gmail Badge"/>
          </a>
          <a href="https://github.com/chetan3327" target='_blank' rel='noreferrer'>
              <img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=GitHub&logoColor=white" alt="Github Badge"/>
          </a>
        </div>
      </div>
    </div>
  )
}


export default New
