import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem('isLoggedIn', true);
            setIsLoggedIn(true);
            setUser(storedUser);
        } else {
            throw new Error('Invalid email or password');
        }
    };

    const logout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    const signup = (email, password) => {
        const newUser = { email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
