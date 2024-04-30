import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext.jsx';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from './components';
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from './data/data.js';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Logout from './components/auth/Logout.jsx';

const App = () => {
  return (
    <AuthProvider>
        <Navbar />
        <Cart />
        <main className='flex flex-col gap-16 relative'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
          <Hero heroapi={heroapi} />
          <Sales endpoint={popularsales} ifExists />
          <FlexContent endpoint={highlight} ifExists />
          <Sales endpoint={toprateslaes} />
          <FlexContent endpoint={sneaker} />
          <Stories story={story} />
        </main>
        <Footer footerAPI={footerAPI} />
  
    </AuthProvider>
  );
};

export default App;
