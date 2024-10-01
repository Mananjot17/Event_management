import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import userLogin from '../../hooks/UserLogin';

function Login() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const { loading, login } = userLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userName, password);
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80'>
                <h1 className='text-4xl font-bold text-center text-gray-800 mb-6'>
                    Login
                    <span className='block text-lg text-gray-500 mt-2'>Event Management App</span>
                </h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    
                    <div>
                        <label className='block text-lg font-medium text-gray-700 mb-2'>
                            UserName
                        </label>
                        <input
                            type="text"
                            placeholder='Enter username'
                            className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-lg font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            className='w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='text-center'>
                        <p className='text-gray-600'>
                            Don't have an account? <Link to="/signup" className='text-indigo-600 hover:underline'>Sign Up</Link>
                        </p>
                    </div>

                    <div>
                        <button 
                            className={`w-full py-3 mt-4 text-white bg-indigo-600 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 hover:bg-indigo-700 ${loading ? 'opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login



