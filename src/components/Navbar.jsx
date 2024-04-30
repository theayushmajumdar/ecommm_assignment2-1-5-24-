import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalQTY, setOpenCart } from '../app/CartSlice.js';
import { Link } from 'react-router-dom';
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';
import Login from './auth/Login.jsx'; 
import { useAuth } from './auth/AuthContext'; // Import useAuth hook to access user authentication status

const Navbar = () => {
    const [navState, setNavState] = useState(false);
    const [showLogin, setShowLogin] = useState(false); 
    const dispatch = useDispatch();
    const totalQTY = useSelector(selectTotalQTY);
    const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from useAuth hook

    const storedUser = JSON.parse(localStorage.getItem('user')); // Access user data from local storage

    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }))
    }

    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);

        return () => {
            window.removeEventListener('scroll', onNavScroll);
        }
    }, []);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <header className={
                !navState ? 'absolute top-7 left-0 right-0 opacity-100 z-50' : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'
            }>
                <nav className='flex items-center justify-between nike-container'>
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt="logo/img"
                            className={`w-16 h-auto ${navState && "filter brightness-0"}`}
                        />
                    </div>

                    <ul className='flex items-center justify-center gap-8'>
                        <li>
                            {isLoggedIn ? ( 
                                <p>Hi, {storedUser?.email}</p> // Display the user's email if logged in
                            ) : (
                                <p>Hi, Guest</p>
                            )}
                        </li>
                        <li className='grid items-center'>
                            <MagnifyingGlassIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                        </li>
                        <li className='grid items-center'>
                            <HeartIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                        </li>
                        <li className='grid items-center'>
                            <button type='button' onClick={onCartToggle} className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                                <ShoppingBagIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navState ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{totalQTY}</div>
                            </button>
                        </li>
                        <li>
                            <button onClick={toggleLogin} className={`text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md shadow-md focus:outline-none ${navState && "hover:bg-blue-400 transition-all duration-300"}`}>Login</button>
                        </li>
                    </ul>
                </nav>
            </header>

            {showLogin && <Login closeModal={toggleLogin} />}
        </>
    )
}

export default Navbar;
