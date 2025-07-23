import react from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Auth/>}/>
       </Routes>
    </>
  )
} 

export default App