import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { TestChart } from "./chart1.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
    };
  }

  render() {
    return (
      <div>
        <li>Time frame</li>
        <li>Categories</li>
        <TestChart />
      </div>
    );
  }
}

export default Metrics;
