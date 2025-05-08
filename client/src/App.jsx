import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Authentication from './pages/Authentication'

const App = () => {
  return (
    <div className='bg-vanila min-h-screen w-full flex'>
      <Authentication/>
      {/* <Home /> */}
    </div>
  )
}

export default App