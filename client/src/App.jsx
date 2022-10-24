import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import SignIn from "./Components/Accounts/SignIn.jsx";
import SignUp from "./Components/Accounts/SignUp.jsx";
import Metrics from "./Components/Metrics/index.jsx";
import CalendarClass from "./Components/Calendar.jsx";
import TodoCreate from "./Components/Forms/TodoCreate.jsx";
import TodoList from "./Components/CalendarInteraction/TodoList.jsx";
import CategoryCreate from "./Components/Forms/CategoryCreate.jsx";
import DeleteButton from "./Components/Forms/DeleteButton.jsx";
import AppointmentShare from "./Components/Appointments/AppointmentShare.jsx";
import TodoShare from "./Components/TodoShare/TodoShare.jsx";
import Modal from "react-modal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

Modal.setAppElement("#app");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      todoID: 104,
      todos: [],
      categories: [],
      currentEvents: [],
      unplannedEvents: [],
    };
  }

  componentDidMount() {
    axios
      .get("/todos", {
        params: {
          id: this.state.userID,
        },
      })
      .then((result) => {
        let currentEvents = [];
        let unplannedEvents = [];
        result.data.forEach((todo) => {
          var { todo_id, task, start_time, end_time } = todo;
          if (start_time === undefined) unplannedEvents.push(todo);
          else
            currentEvents.push({
              todo_id,
              title: task,
              start: start_time,
              end: end_time,
            });
        });
        this.setState({
          ...this.state,
          todos: result.data,
          currentEvents,
          unplannedEvents,
        });
      });

    axios
      .get("/categories", {
        params: {
          id: this.state.userID,
        },
      })
      .then((result) => {
        const categories = result.data.map((option, i) => {
          return {
            key: option.category,
            value: option.category_id,
            color: option.color,
          };
        });
        this.setState({ ...this.state, categories });
      });
  }

  render() {
    return (
      <Router>
        <div>
          <div>Encompass</div>
          {/* <SignIn />
          <SignUp /> */}
          <Metrics />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <CalendarClass
                  events={this.state.currentEvents}
                  userID={this.state.userID}
                />
              }
            />
            <Route
              path="/share/appointment"
              element={<AppointmentShare userID={this.state.userID} />}
            />
            <Route
              path="/share/calendar"
              element={<TodoShare userID={this.state.userID} />}
            />
          </Routes>
          <TodoList
            todos={this.state.todos}
            categories={this.state.categories}
          />
          <h1>THIS CREATES A TODO ENTRY</h1>
          <TodoCreate
            userID={this.state.userID}
            categories={this.state.categories}
          />
          <h1>THIS CREATES A CATEGORY</h1>
          <CategoryCreate userID={this.state.userID} />
          <h1>THIS DELETES SOMETHING</h1>
          <DeleteButton todoID={this.state.todoID} />
        </div>
      </Router>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
