import React from 'react';
import {useNavigate, Routes, Route } from "react-router-dom";
import Feed from '../feed/Feed'
import Home from '../home';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import './App.css';


const App = () => { 
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home navigate={ useNavigate() }/>}/>
        <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
        <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
        <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
      </Routes>
    </>
  );
}

export default App;







// Other commands

// let Component 
// switch ((window.location.pathname)) {
//   case "/":
//     Component = Home
//     break
//   case "/signup":
//     Component = SignUpForm 
//     break
//   case "/login":
//     Component = LoginForm
//     break
// } 