import React, { useState } from 'react'
import Logo from '../Logo'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await axios.post('/auth/login', { username, password }, { withCredentials: true })
            if (res.data?.isValidated) {
                navigate('/')
            } else {
                setError('Login failed.')
            }
        } catch (err) {
            setError('Invalid username or password.')
        }
    }

    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <div className="w-3/5 h-3/4 flex flex-col justify-center items-center">
                <div className="mb-4">
                    <Logo />
                </div>
                <form onSubmit={handleLogin} className='w-full max-w-md flex flex-col px-10'>
                    <input
                        className="mb-4 p-2 border rounded-xl outline-none"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="mb-4 p-2 border rounded-xl outline-none"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
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
                        <span>New user? </span><Link to="/register" className="text-gunMetal cursor-pointer text-center hover:underline hover:text-azul font-semibold">
                            Click here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth
