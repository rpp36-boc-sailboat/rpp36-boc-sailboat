import React from 'react';
import {Outlet,Link } from "react-router-dom";

const LandingNav= () =>{
  return (
  <div className ="header">
    <ul>
      <li>
        <Link to="/*"></Link>
      </li>
      <li>
        <Link to="/signin">
          <button>Sign In</button></Link>
      </li>
      <li>
        <Link to="/signup">
          <button>Sign up</button></Link>
      </li>
      <Outlet />



    </ul>
  </div>
  );
}
export default LandingNav;