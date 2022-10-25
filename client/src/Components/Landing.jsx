import React from 'react';
import SignIn from "./Accounts/SignIn.jsx";
import SignUp from "./Accounts/SignUp.jsx";
import LandingNav from "./Navbar/LandingNav.jsx"
import {BrowserRouter, Routes, Route } from "react-router-dom";

const Landing =()=>{

  return (
    <>
      <BrowserRouter>
      <LandingNav/>

        <Routes>
          <Route exact path ="/" element ={<>
          <h1>  Welcome to Landing page</h1>
            <p>info</p>
          </>}>
          </Route>
          <Route exact path ='/signin' element={<SignIn />}></Route>
          <Route exact path ='/signup' element={<SignUp />}></Route>
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default Landing
