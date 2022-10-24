import React from 'react';
import {Outlet,Link } from "react-router-dom";

const Navbar= () =>{
  return (
  <div className ="header">
    <ul>
      <li>
        <Link to="/">
          <button>Today</button>
        </Link>
      </li>
      <li>
        <Link to="/metrics">
        <button>Metrics</button></Link>
      </li>
      <li>
        <Link to="/forms"><button>Todo</button></Link>
      </li>
      <li>
        <Link to="/settings">
        <button>Settings</button></Link>
      </li>
      <li>
        <Link to="/signout"><button>Signout</button>
        </Link>
      </li>
      <Outlet />
    </ul>
  </div>
  );
}
export default Navbar;