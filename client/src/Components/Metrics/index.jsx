import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";

import ReportTable from "./Report_Table.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      categoriesANDcolor: [],
      categories: [], // NOT RESETTING when time/cat changes
      timeFrame: "Today",
      category: "All",
      // todos: [],
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
        // console.log("xxx", allData);
        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }
        this.setState({ categoriesANDcolor, categories, allData });
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
        // console.log("cats", categories);
        this.setState({
          categoriesANDcolor,
          categories,
          category: input,
          timeFrame: timeR,
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
        this.setState({
          categoriesANDcolor,
          categories,
          allData,
          timeFrame: input,
        });
      });
  }

  timeUpdated(input) {
    console.log("hit", this.state.category);
    // when invoked from table duration update, run the above three functions (or one at a time)

    if (this.state.category === "All") {
      axios
        .get("/completedTasks", {
          params: {
            timeRange: "Today",
            catg: "All",
          },
        })
        .then((allCompletedToDos) => {
          let allData = allCompletedToDos.data.results;
          // console.log("xxx", allData);
          let categoriesANDcolor = [];
          let categories = ["All"];
          for (let cat of allCompletedToDos.data.results) {
            categoriesANDcolor.push([cat.category, cat.color]);
            if (!categories.includes(cat.category)) {
              categories.push(cat.category);
            }
          }
          this.setState({ categoriesANDcolor, categories, allData });
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
    return (
      <div>
        <br></br>
        <div>
          <label htmlFor="timeframe">Timeframe:</label>
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
            {/* <option value="Custom">Custom</option> */}
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
        <br></br>

        <hr></hr>

        <div id="Print">
          <ReportTable
            data={this.state.allData}
            timeUpdated={this.timeUpdated.bind(this)}
          />
          <br></br>
          <hr></hr>
          {this.state.category === "All" ? (
            <ReportPieChart data={this.state} />
          ) : (
            <ReportBarChart data={this.state} />
          )}
        </div>
        <br></br>
        <button onClick={this.printDocument.bind(this)}>
          Download Report (PDF)
        </button>
      </div>
    );
  }
}

const CategoryList = (props) => {
  console.log("cats", props);
  return <option value={`${props.cat}`}>{props.cat}</option>;
};

export default Metrics;
