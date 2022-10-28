import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
// import "./index.css";

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
      <div >
        <Slider {...settings}>
          <div>
           Feature 1 img
          </div>
          <div>
            Feature 2 img
          </div>
          <div>
            Feature 3 img
          </div>
          <div>
           Feature 4 img
          </div>
        </Slider>
      </div>
    );
  }
}