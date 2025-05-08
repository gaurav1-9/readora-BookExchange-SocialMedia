import React from 'react'

const Register = () => {
    return (
        <form onSubmit={handleRegister} className='w-full max-w-md flex flex-col px-10'>
            <input
                className="mb-4 p-2 border rounded-xl outline-none capitalize"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                className="mb-4 p-2 border rounded-xl outline-none lowercase"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                className="mb-4 p-2 border rounded-xl outline-none lowercase"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <div className="relative flex items-center">
                <input
                    className="mb-4 p-2 w-full border rounded-xl outline-none pr-8"
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
                Register
            </button>

            <div className="min-h-[1.5rem] flex justify-center">
                {error && (
                    <p className="text-tomato font-semibold mt-3 text-sm">{error}</p>
                )}
            </div>

            <div className='flex items-center mt-3 gap-1 justify-center'>
                <span>Already have an account? </span>
                <Link to="/login" className="text-gunMetal cursor-pointer text-center hover:underline hover:text-azul font-semibold">
                    Login here
                </Link>
            </div>
        </form>
    )
}

export default Register