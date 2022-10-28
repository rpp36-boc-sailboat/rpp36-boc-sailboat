import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import SignIn from "./Components/Accounts/SignIn.jsx";
import SignUp from "./Components/Accounts/SignUp.jsx";
import Metrics from "./Components/Metrics/index.jsx";
import CalendarClass from "./Components/Calendar.jsx";
import TodoCreate from './Components/Forms/TodoCreate.jsx';
import TodoList from './Components/CalendarInteraction/TodoList.jsx';
import CategoryCreate from './Components/Forms/CategoryCreate.jsx';
import DeleteButton from './Components/Forms/DeleteButton.jsx';
import CompleteButton from './Components/Forms/CompleteButton.jsx';
import AppointmentShare from './Components/Appointments/AppointmentShare.jsx';
import TodoShare from './Components/TodoShare/TodoShare.jsx';
import TaskHome from './Components/Forms/TaskHome.jsx';
import Modal from 'react-modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Nav.jsx";
import Landing from "./Components/Landing.jsx";

Modal.setAppElement("#app");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleAddCategoryClick = this.handleAddCategoryClick.bind(this);
    this.handleAddCategorySubmit = this.handleAddCategorySubmit.bind(this);
    this.loginToggel = this.loginToggel.bind(this);
    this.state = {
      userID: 1,
      todoID: 124,
      todos: [],
      categories: [],
      categoryColors: {},
      currentEvents: [],
      unplannedEvents: [],
      addCategory: false
    };
    this.updateCompleted = this.updateCompleted.bind(this);
    this.plannedToDo = this.plannedToDo.bind(this);
  }

  componentDidMount() {
    axios
      .get("/todos", {
        params: {
          id: this.state.userID,
        },
      })
      .then((result) => {
        this.setState({ todos: result.data });
      });

    axios
      .get("/categories", {
        params: {
          id: this.state.userID,
        },
      })
      .then((result) => {
        let categoryColors = {};
        const categories = result.data.map((option, i) => {
          categoryColors[option.category_id] = [option.color, option.category];
          return {
            key: option.category,
            value: option.category_id,
            color: option.color,
          };
        });
        this.setState({ categories, categoryColors });
      });
  }


  componentDidUpdate() {
    if (
      Object.keys(this.state.categoryColors).length !== 0 &&
      this.state.todos.length !== 0 &&
      this.state.currentEvents.length === 0
    ) {
      let currentEvents = [];
      let unplannedEvents = [];
      let todos = this.state.todos.map((todo) => {
        var { todo_id, task, start_time, end_time, category_id } = todo;
        var [color, category] = this.state.categoryColors[category_id];
        var [red, blue, green] = [
          parseInt(color.slice(1, 3), 16),
          parseInt(color.slice(3, 5), 16),
          parseInt(color.slice(5, 7), 16),
        ];
        var text =
          red * 0.299 + green * 0.587 + blue * 0.114 > 186
            ? "#000000"
            : "#ffffff";
        todo["backgroundColor"] = color;
        todo["borderColor"] = color;
        todo["category"] = category;
        todo["textColor"] = text;
        if (!start_time) unplannedEvents.push(todo);
        else{
          currentEvents.push({
            todo_id,
            title: task,
            start: start_time,
            end: end_time,
            category_id,
            backgroundColor: color,
            borderColor: color,
            textColor: text
          });
        }
        return todo;
      });
      this.setState({ currentEvents, unplannedEvents, todos });
    }
  }

  handleTodoSubmit() {
    axios
    .get("/todos", {
      params: {
        id: this.state.userID,
      },
    })
    .then((result) => {
      this.setState({ todos: result.data });
    });
  }

  handleAddCategoryClick() {
    if (this.state.addCategory === false) {
      this.setState({addCategory: true});
    } else if (this.state.addCategory === true) {
      this.setState({addCategory: false});
    }
  }

  plannedToDo(i) {
    let index = parseInt(i);
    let newUnplanned = [...this.state.unplannedEvents.slice(0, index),
       ...this.state.unplannedEvents.slice(index + 1)];
    this.setState({
      unplannedEvents: newUnplanned
    });
  }

  handleAddCategorySubmit() {
    this.setState({addCategory: false});
    axios.get('/categories', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      let categoryColors = {};
      const categories = result.data.map((option, i) => {
        categoryColors[option.category_id] = [option.color, option.category];
        return {key: option.category, value: option.category_id, color: option.color}
      });
      this.setState({categories, categoryColors})
    });
  }
  loginToggel(event){
    console.log('debug')


    this.setState({userID:0,
      todoID: 124,
      todos: [],
      categoryColors: {},
      currentEvents: [],
      unplannedEvents: [],
      categories: [],
      addCategory: false})

  }

  updateCompleted() {
    console.log('start of get Route');
    axios.get('/todos', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      console.log('end of get route');
      this.setState({
        todos: result.data,
      })
    })
  }

  render() {
    const status = this.state.userID >= 1;
    return (
      <>
        {status && (
          <BrowserRouter>
            <Navbar loginToggel ={this.loginToggel}/>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <TodoList todos={this.state.unplannedEvents} />
                    <CalendarClass
                      events={this.state.currentEvents}
                      userID={this.state.userID}
                      plannedToDo={this.plannedToDo}
                    />
                  </>
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
              <Route exact path="/metrics" element={<><Metrics /></>}></Route>
              <Route
                exact
                path="/forms"
                element={
                  <>
                    <TodoCreate userID={this.state.userID}
                    categories={this.state.categories}
                    handleTodo={this.handleTodoSubmit}
                    handleClick={this.handleAddCategoryClick}
                    showModal={this.state.addCategory}
                    handleCategorySubmit={this.handleAddCategorySubmit}/>
                    <TaskHome todos={this.state.todos} updateCompleted={this.updateCompleted}/>
                  </>
                }
              ></Route>
              <Route exact path="/settings" element={<><p>settings</p></>}></Route>
              <Route exact path="/signout" element={<></>}></Route>
            </Routes>
          </BrowserRouter>
        )}
        {!status && <Landing />}
      </>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
