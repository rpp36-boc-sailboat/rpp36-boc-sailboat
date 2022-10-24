import React from 'react';
import {Outlet,Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Calendar</Link>
    </li>
    <li>
      <Link to="/metrics">Mtr</Link>
    </li>
    <li>
      <Link to="/forms">Todo</Link>
    </li>
    <li>
      <Link to="/settings">settings</Link>
    </li>
    <li>
      <Link to="/signout">signout</Link>
    </li>
    <Outlet />
  </div>
  );
}
export default Navbar;