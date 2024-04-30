import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const Login = () => {
    const { isLoggedIn, login } = useAuth(); 
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
                await login(formData.email, formData.password);
                navigateTo('/signup');
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleSignup = () => {
        navigateTo('/signup');
    };

    return (
        <div className="modal">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mb-4 py-2 px-3 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <label className="mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mb-4 py-2 px-3 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md focus:outline-none hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>

                        {isLoggedIn ? ( // Render either logout or signup button based on user's authentication status
                            <Logout />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md focus:outline-none hover:bg-green-600 transition-colors"
                            >
                                Signup
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
