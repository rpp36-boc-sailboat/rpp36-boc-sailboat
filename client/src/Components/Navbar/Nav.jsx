import React from 'react';
import {Outlet,Link } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
        <BarChartIcon/></Link>
      </li>
      <li>
        <Link to="/forms">
        <AddTaskIcon/>
        </Link>
      </li>
      <li>
        <Link to="/settings">
        <SettingsApplicationsIcon/></Link>
      </li>
      <li>
        <Link to="/signout"><ExitToAppIcon/>
        </Link>
      </li>
      <Outlet />
    </ul>
  </div>
  );
}
export default Navbar;