import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import New from './pages/New'
import App from './App'

const Main = () => {
  return (
    <Router>
        <Routes>
            
            <Route path='/' element={<New />} />
            <Route path='/:id' element={<App />} />
        </Routes>
    </Router>   
  )
}

export default Main