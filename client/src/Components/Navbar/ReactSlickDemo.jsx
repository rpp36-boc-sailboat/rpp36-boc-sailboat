import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "./index.css";

export default class ReactSlickDemo extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };


    return (
      <div className ="container">
        <Slider {...settings}>
          <div >
           <h3>Daily Calendar Views</h3>
           <img src="https://i.postimg.cc/MHCPmQyM/Screen-Shot-2022-10-28-at-4-01-52-PM.png"
           alt="daycalendar" />
          </div>
          <div>
            <h3>Monthly Calendar Views</h3>
            <img src="https://i.postimg.cc/KvnVZ0Pd/Screen-Shot-2022-10-28-at-4-22-40-PM.png"
           alt="monthcalendar" />
          </div>
          <div>
            <h3>Metrics Feature</h3>
            <img src="https://i.postimg.cc/wBP9YWzS/Screen-Shot-2022-10-28-at-4-04-04-PM.png"
           alt="metrics" />
          </div>
          <div>
            <h3>Custom your tasks Feature</h3>
            <img src="https://i.postimg.cc/hPSW6FxX/Screen-Shot-2022-10-28-at-4-04-24-PM.png"
           alt="custom tasks" />
          </div>
          <div>
            <h3>Additonal features comming soon</h3>
          </div>
        </Slider>
      </div>
    );
  }
}