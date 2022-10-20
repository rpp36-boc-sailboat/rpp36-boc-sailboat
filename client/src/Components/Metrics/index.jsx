import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";
import ReportTable from "./Report_Table.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      categoriesANDcolor: [],
      categories: [],
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
    // axios.get("/categories").then((allCategories) => {
    //   let categoriesANDcolor = [];
    //   let categories = [];
    //   for (let cat of allCategories.data.results) {
    //     categoriesANDcolor.push([cat.category, cat.color]);
    //     if (!categories.includes(cat.category)) {
    //       categories.push(cat.category);
    //     }
    //   }
    //   this.setState({ categoriesANDcolor, categories });
    // });

    // axios.get("/allTodos").then((allToDos) => {
    //   var todos = [];
    //   for (var cat of allToDos.data.results) {
    //     todos.push([cat.category_id, cat.start_time, cat.end_time]);
    //   }
    //   this.setState({ todos });
    // });
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
        // let categories = ["All"];
        for (let cat of allCatgData.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          // if (!categories.includes(cat.category)) {
          //   categories.push(cat.category);
          // }
        }
        this.setState({
          categoriesANDcolor,
          // categories,
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
        // let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          // if (!categories.includes(cat.category)) {
          //   categories.push(cat.category);
          // }
        }
        this.setState({
          categoriesANDcolor,
          // categories,
          allData,
          timeFrame: input,
        });
      });
  }

  render() {
    return (
      <div>
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
        <ReportTable data={this.state.allData} />

        {this.state.category === "All" ? (
          <ReportPieChart data={this.state} />
        ) : (
          <ReportBarChart data={this.state} />
        )}

        <div> download report</div>
      </div>
    );
  }
}

const CategoryList = (props) => {
  return <option value={`${props.cat}`}>{props.cat}</option>;
};

export default Metrics;
