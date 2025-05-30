import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { setUser, setIsLoggedIn } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',
        { username, password },
        { withCredentials: true })
      if (!res.data.err) {
        setUser(res.data.user)
        setIsLoggedIn(true)
        navigate('/profile')
      } else {
        setError('Login failed.')
      }
    } catch (err) {
      setError('Invalid username or password.')
    }
  }

  const navigateToReg = () => {
    navigate('/auth/register', { replace: true })
  }

  return (
    <form onSubmit={handleLogin} className='w-full max-w-md flex flex-col px-10'>
      <input
        className="mb-4 p-2 border rounded-xl outline-none"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <div className="relative flex items-center">
        <input
          className={`mb-4 p-2 w-full border rounded-xl outline-none pr-8 ${!showPassword ? 'font-extrabold tracking-widest' : 'font-normal'} placeholder:tracking-normal placeholder:font-normal`}
          type={(showPassword) ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="w-4 h-4 bg-gunMetal absolute right-2 top-3 rounded-full cursor-pointer hover:bg-gunMetal/90" onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}></div>
      </div>
      <button
        type="submit"
        className="p-2 rounded-xl bg-gunMetal text-babyPowder font-semibold uppercase cursor-pointer hover:bg-gunMetal/90"
      >
        Login
      </button>

      <div className="min-h-[1.5rem] flex justify-center">
        {error && (
          <p className="text-tomato font-semibold mt-3 text-sm">{error}</p>
        )}
      </div>

      <div className='flex items-center mt-3 gap-1 justify-center'>
        <span>New user? </span>
        <span to="/auth/register" className="text-gunMetal cursor-pointer text-center hover:underline hover:text-azul font-semibold" onClick={navigateToReg}>
          Click here
        </span>
      </div>
    </form>
  )
}

export default Login