import React from 'react'
import {useAuth} from './AuthContext'
import {useNavigate} from 'react-router-dom';

const Logout = ()=>{
    const {logout} = useAuth();
    const navigateTo= useNavigate();

    const handleLogout= ()=> {
        logout();
        navigateTo('/login');
    };

    return (
        <div>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;