import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Authentication from './pages/Authentication'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'

const App = () => {
  return (
    <div className='bg-vanila min-h-screen w-full flex'>
      {/* <Home /> */}
      <Routes>
        <Route path='/auth' element={<Authentication/>}>
        <Route index element={<Navigate to="login" replace />} />
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App