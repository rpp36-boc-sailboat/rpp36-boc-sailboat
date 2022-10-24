import React from 'react';
import {Outlet,Link } from "react-router-dom";
const LandingNav= () =>{
  return (
  <div>
    <ul>
      <li>
        <Link to="/"></Link>
      </li>
      <li>
        <Link to="/signup">signup</Link>
      </li>
    </ul>

    <Outlet />
  </div>
  );
}
export default LandingNav;