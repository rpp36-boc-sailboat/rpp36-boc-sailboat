import React from 'react';
import {Outlet,Link } from "react-router-dom";
const LandingNav= () =>{
  return (
  <div>
    <li>
      <Link to="/">Landing</Link>
    </li>
    <li>
      <Link to="/signup">signup</Link>
    </li>

    <Outlet />
  </div>
  );
}
export default LandingNav;