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
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Nav.jsx";
import Landing from "./Components/Landing.jsx";

Modal.setAppElement("#app");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleAddCategoryClick = this.handleAddCategoryClick.bind(this);
    this.handleAddCategorySubmit = this.handleAddCategorySubmit.bind(this);
    this.handleSignInUser = this.handleSignInUser.bind(this);
    this.handleSignUpUser = this.handleSignUpUser.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
        ? {
            id: JSON.parse(localStorage.getItem('user')).id,
            firstname: JSON.parse(localStorage.getItem('user')).firstname,
            isLoggedIn: JSON.parse(localStorage.getItem('user')).isLoggedIn
          }
        : {
            id: 0,
            firstname: 'Guest',
            isLoggedIn: false
          },
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

  componentDidMount(id) {
    this.getTodos(id);
    this.getCategories(id);
  }

  getTodos(id = this.state.user.id) {
    axios
      .get("/todos", {
        params: {
          id
        },
      })
      .then((result) => {
        this.setState({ todos: result.data });
      });
  }

  getCategories(id = this.state.user.id) {
    axios
      .get("/categories", {
        params: {
          id
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
        id: this.state.user.id,
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
        id: this.state.user.id
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

  updateCompleted() {
    console.log('start of get Route');
    axios.get('/todos', {
      params: {
        id: this.state.user.id
      }
    })
    .then(result => {
      console.log('end of get route');
      this.setState({
        todos: result.data,
      })
    })
  }

  handleSignInUser (user) {
    axios({
      method: 'POST',
      data: {
        email: user.email,
        password: user.password,
      },
      withCredentials: true,
      url: '/auth/signin',
    })
    .then((res) => {
      let user = {
        id: res.data.user.id,
        firstname: res.data.user.firstname,
        isLoggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ user });
      this.getTodos(user.id);
      this.getCategories(user.id);
    })
    .catch((err) => {
      err.response.status === 404
        ? alert('Incorrect email or password.')
        : alert(err.message);
    })
  }

  handleSignUpUser (user) {
    let email = user.email.toLowerCase();
    let firstname = user.firstName[0].toUpperCase() + user.firstName.substring(1);
    let lastname = user.lastName[0].toUpperCase() + user.lastName.substring(1);
    let password = user.password;
    axios({
      method: 'POST',
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      },
      withCredentials: true,
      url: '/auth/signup',
    })
    .then((res) => {
      let user = {
        id: res.data[0].user_id,
        firstname: res.data[0].firstname,
        isLoggedIn: false
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.handleSignInUser({ 'email': email, 'password': password });
    })
    .catch((err) => {
      err.response.status === 404
        ? alert('A user with that email already exists.')
        : alert(err.message);
    })
  }

  render() {
    const status = this.state.user.id >= 1 && this.state.user.isLoggedIn;
    return (
      <>
        {status && (
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <TodoList todos={this.state.unplannedEvents} />
                    <CalendarClass
                      events={this.state.currentEvents}
                      userID={this.state.user.id}
                      plannedToDo={this.plannedToDo}
                    />
                  </>
                }
              />
              <Route
                path="/share/appointment"
                element={<AppointmentShare userID={this.state.user.id} />}
              />
              <Route
                path="/share/calendar"
                element={<TodoShare userID={this.state.user.id} />}
              />
              <Route exact path="/metrics" element={<Metrics />}></Route>
              <Route
                exact
                path="/forms"
                element={
                  <>
                    <TodoCreate userID={this.state.user.id}
                    categories={this.state.categories}
                    handleTodo={this.handleTodoSubmit}
                    handleClick={this.handleAddCategoryClick}
                    showModal={this.state.addCategory}
                    handleCategorySubmit={this.handleAddCategorySubmit}/>
                    <TaskHome todos={this.state.todos} updateCompleted={this.updateCompleted}/>
                  </>
                }
              ></Route>
              {status && <Route exact path="/signup" element={<Navigate replace to="/" />}></Route>}
              {status && <Route exact path="/signin" element={<Navigate replace to="/" />}></Route>}
              <Route exact path="/settings" element={<>settings</>}></Route>
              <Route exact path="/signout" element={<>signout</>}></Route>
            </Routes>
          </BrowserRouter>
        )}
        {!status && <Landing userId={this.state.user.id} signInClick={this.handleSignInUser} signUpClick={this.handleSignUpUser} />}
      </>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
