import React from 'react';
import {Outlet,Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Today</Link>
    </li>
    <li>
      <Link to="/share/appointment"> Share apt</Link>
    </li>
    <li>
      <Link to="/metrics">Mtr</Link>
    </li>
    <Outlet />
  </div>
  );
}
export default Navbar;