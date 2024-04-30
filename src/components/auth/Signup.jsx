import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { signup } = useAuth(); 
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await signup(formData.email, formData.password);
          navigateTo('/App');
      } catch (error) {
          console.error("Error signing up:", error);
      }
  };  
  

    return (
        <div className="signup-modal">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Signup</h2>
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
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
