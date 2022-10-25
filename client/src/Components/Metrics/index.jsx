import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";

import ReportTable from "./Report_Table.jsx";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      categoriesANDcolor: [],
      categories: [], // NOT RESETTING when time/cat changes; sticking only for shop catg
      timeFrame: "Today",
      category: "All",
      totalTime: "0 min",
    };
  }

  componentDidMount() {
    axios
      .get("/completedTasks", {
        params: {
          timeRange: "Today",
          catg: "All",
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;

        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        function secondsToHms(d) {
          d = Number(d);
          let h = Math.floor(d / 3600);
          let m = Math.floor((d % 3600) / 60);
          let s = Math.floor((d % 3600) % 60);

          let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
          let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
          let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
          return hDisplay + mDisplay + sDisplay;
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = secondsToHms(catgDurations.totalTimeSpent);

        // console.log("in cdm:", totalTime);
        this.setState({ categoriesANDcolor, categories, allData, totalTime });
      });
  }

  specifyCategory(input, timeR) {
    axios
      .get("/completedTasksPerCatg", {
        params: {
          timeRange: timeR,
          catg: input,
        },
      })
      .then((allCatgData) => {
        this.setState({ allData: allCatgData.data.results });

        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCatgData.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        function secondsToHms(d) {
          d = Number(d);
          let h = Math.floor(d / 3600);
          let m = Math.floor((d % 3600) / 60);
          let s = Math.floor((d % 3600) % 60);

          let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
          let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
          let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
          return hDisplay + mDisplay + sDisplay;
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = secondsToHms(catgDurations.totalTimeSpent);

        this.setState({
          categoriesANDcolor,
          categories,
          category: input,
          timeFrame: timeR,
          totalTime,
        });
      });
  }

  specifyTimeframe(input, catg) {
    axios
      .get("/completedTasks", {
        params: {
          timeRange: input,
          catg: catg,
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;
        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        function secondsToHms(d) {
          d = Number(d);
          let h = Math.floor(d / 3600);
          let m = Math.floor((d % 3600) / 60);
          let s = Math.floor((d % 3600) % 60);

          let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
          let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
          let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
          return hDisplay + mDisplay + sDisplay;
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = secondsToHms(catgDurations.totalTimeSpent);

        this.setState({
          categoriesANDcolor,
          categories,
          allData,
          timeFrame: input,
          totalTime,
        });
      });
  }

  timeUpdated(input) {
    if (this.state.category === "All") {
      axios
        .get("/completedTasks", {
          params: {
            timeRange: this.state.timeFrame,
            catg: "All",
          },
        })
        .then((allCompletedToDos) => {
          let allData = allCompletedToDos.data.results;
          let categoriesANDcolor = [];
          let categories = ["All"];
          for (let cat of allCompletedToDos.data.results) {
            categoriesANDcolor.push([cat.category, cat.color]);
            if (!categories.includes(cat.category)) {
              categories.push(cat.category);
            }
          }

          let chartLegend = [];
          let chartColors = [];
          for (let cat of categoriesANDcolor) {
            if (!chartLegend.includes(cat[0])) {
              chartLegend.push(cat[0]);
              chartColors.push(cat[1]);
            }
          }

          let catgDurations = {};
          for (let key of categories) {
            if (key !== "All") {
              catgDurations[key] = [];
            }
          }

          for (let key in catgDurations) {
            for (let i = 0; i < allData.length; i++) {
              if (key === allData[i].category) {
                catgDurations[key].push([
                  allData[i].start_time,
                  allData[i].end_time,
                ]);
              }
            }
          }

          function secondsToHms(d) {
            d = Number(d);
            let h = Math.floor(d / 3600);
            let m = Math.floor((d % 3600) / 60);
            let s = Math.floor((d % 3600) % 60);

            let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
            let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay;
          }

          let totalTimeSpent = 0;
          let chartData = [];
          for (let catg in catgDurations) {
            let catgTotalSec = 0;

            for (let i = 0; i < catgDurations[catg].length; i++) {
              let start = new Date(catgDurations[catg][i][0]);
              let end = new Date(catgDurations[catg][i][1]);

              let start_sec = start.getTime() / 1000;
              let end_sec = end.getTime() / 1000;
              let difference = Math.abs(start_sec - end_sec);
              catgTotalSec += difference;
            }

            catgDurations[catg].totalSec = catgTotalSec;
            chartData.push(catgTotalSec);
            catgDurations[catg].totalDuration = secondsToHms(catgTotalSec);
            totalTimeSpent += catgTotalSec;
          }
          catgDurations.totalTimeSpent = totalTimeSpent;
          let totalTime = secondsToHms(catgDurations.totalTimeSpent);

          this.setState({ categoriesANDcolor, categories, allData, totalTime });
        });
    } else {
      this.specifyCategory(input, this.state.timeFrame);
    }
  }

  printDocument() {
    const printable = document.getElementById("Print");
    html2canvas(printable, {
      scale: 1,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save("Report.pdf");
      })
      .catch((err) => {
        console.log("errrr", err);
      });
  }

  render() {
    // console.log(this.state.totalTime);
    return (
      <div id="Print">
        <br></br>
        <hr></hr>
        <div className="taskDescription">
          {" "}
          You have <em>{this.state.allData.length}</em> tasks completed{" "}
          <em>{this.state.timeFrame}</em>. <br></br> You spent a total time of{" "}
          <b>{this.state.totalTime}</b>
        </div>

        <hr></hr>
        <br></br>
        <div className="dropDownContainer">
          <div>
            <label htmlFor="timeframe">Time frame:</label>
            <select
              name="timeframe"
              id="timeframe"
              onChange={(e) => {
                this.specifyTimeframe(e.target.value, this.state.category);
              }}
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <br></br>
          <div>
            <label htmlFor="Category">Category:</label>
            <select
              name="Category"
              id="Category"
              onChange={(e) => {
                this.specifyCategory(e.target.value, this.state.timeFrame);
              }}
            >
              {this.state.categories.map((cat, i) => (
                <CategoryList cat={cat} key={i} />
              ))}
            </select>
          </div>
        </div>
        <br></br>

        {/* <hr></hr> */}
        {this.state.allData.length === 0 ? (
          <div>
            <img
              className="zeroTaskImg"
              src="https://media1.tenor.com/images/6ab85c56ad28d8bd310c9b7cc7e67163/tenor.gif?itemid=26987558"
            />
          </div>
        ) : (
          <div>
            <div>
              <div>
                {this.state.category === "All" ? (
                  <ReportPieChart data={this.state} />
                ) : (
                  <ReportBarChart data={this.state} />
                )}
              </div>
              <br></br>
              <ReportTable
                data={this.state.allData}
                timeUpdated={this.timeUpdated.bind(this)}
              />

              {/* <hr></hr> */}
            </div>
            <br></br>
            <div className="reportPDFbtnDIV">
              <button
                className="reportPDFbtn"
                onClick={this.printDocument.bind(this)}
              >
                Download Report (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const CategoryList = (props) => {
  return <option value={`${props.cat}`}>{props.cat}</option>;
};

export default Metrics;
