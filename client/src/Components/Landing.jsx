import React from 'react';
import SignIn from "./Accounts/SignIn.jsx";
import SignUp from "./Accounts/SignUp.jsx";
import LandingNav from "./Navbar/LandingNav.jsx"
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ReactSlickDemo from "./Navbar/ReactSlickDemo.jsx"
const Landing =()=>{

  return (
    <>
      <BrowserRouter>
      <LandingNav/>

        <Routes>
          <Route exact path ="/*" element ={
          <div className="contain">
            <h2 style={{textAlign:"center"}}>Welcome to ENCOMPASS</h2>
            <p className="textp">Encompass is a daily task manager to line up your appointments or tasks with a matching calendar and offers metrics.</p>
              <ReactSlickDemo />

          </div>}/>

          <Route path ='/signin' element={<SignIn />}/>
          <Route path ='/signup' element={<SignUp />}/>

        </Routes>


      </BrowserRouter>
    </>
  )
}

export default Landing
