import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { TestChart } from "./chart1.jsx";
import ReportTable from "./Report_Table.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      categoriesANDcolor: [],
      categories: [],
      timeFrame: "Today",
      category: "",
      // todos: [],
    };
  }
  componentDidMount() {
    axios
      .get("/completedTasks", {
        params: {
          timeRange: "Today",
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;
        // console.log("xxx", allData);
        let categoriesANDcolor = [];
        let categories = [];
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
  specifyCategory(input) {
    // console.log("cat input", input);
    // var updatedArr = this.state.categoriesANDcolor.filter(
    //   (val) => val[0] === input
    // );
    this.setState({ category: input });
    // this.setState({ categoriesANDcolor: updatedArr });
  }
  specifyTimeframe(input) {
    // console.log("time input", input);
    this.setState({ timeFrame: input });

    axios
      .get("/completedTasks", {
        params: {
          timeRange: input,
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;
        let categoriesANDcolor = [];
        let categories = [];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }
        this.setState({ categoriesANDcolor, categories, allData });
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
              this.specifyTimeframe(e.target.value);
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
              this.specifyCategory(e.target.value);
            }}
          >
            {this.state.categories.map((cat, i) => (
              <CategoryList cat={cat} key={i} />
            ))}
          </select>
        </div>
        <ReportTable data={this.state.allData} />
        <TestChart data={this.state} />

        <div> download report</div>
      </div>
    );
  }
}

const CategoryList = (props) => {
  return <option value={`${props.cat}`}>{props.cat}</option>;
};

export default Metrics;
