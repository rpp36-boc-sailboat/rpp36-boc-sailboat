import React from 'react';
import {Outlet,Link } from "react-router-dom";
import Button from '@mui/material/Button';

const LandingNav= () =>{
  return (
  <div >
    <ul className ="header2">
      <li>
        <Link to="/*"></Link>
      </li>
      <li className="buttonNav">
        <Link to="/signin">
          <Button  variant="contained">Sign In</Button></Link>
      </li>
      <li>
        <Link to="/signup">
          <Button className="small" variant="contained">Sign up</Button></Link>
      </li>
      <Outlet />

     </ul>
  </div>
  );
}
export default LandingNav;