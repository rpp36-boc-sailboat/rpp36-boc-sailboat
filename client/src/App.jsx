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
import AppointmentShare from './Components/Appointments/AppointmentShare.jsx';
import TodoShare from './Components/TodoShare/TodoShare.jsx';
import Modal from 'react-modal';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Nav.jsx"
import Landing from "./Components/Landing.jsx"

Modal.setAppElement('#app');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      todoID: 104,
      todos: [],
      categoryColors: {},
      currentEvents: [],
      unplannedEvents: [],
      categories: [],
    };
  }

  componentDidMount() {
    axios.get('/todos', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      this.setState({todos: result.data});
    })

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

  componentDidUpdate() {
    if (Object.keys(this.state.categoryColors).length !== 0 &&
    this.state.todos.length !== 0 && this.state.currentEvents.length === 0) {
      let currentEvents = [];
      let unplannedEvents = [];
      let todos = this.state.todos.map((todo) => {
        var {todo_id, task, start_time, end_time, category_id} = todo;
        let [color, category] = this.state.categoryColors[category_id];
        todo['backgroundColor'] = color;
        todo['borderColor'] = color;
        todo['category'] = category;
        if (!start_time) unplannedEvents.push(todo);
        else currentEvents.push({todo_id, title: task, start: start_time,
          end: end_time, category_id, backgroundColor: color, borderColor: color});
        return todo;
      })
      this.setState({currentEvents, unplannedEvents, todos});
    }
  }

  render() {
    const status = this.state.userID >=1
    return (
      <>
      {status && <BrowserRouter>
        {/* <div>
          <div>Encompass</div> */}
          {/* <SignUp />
          <SignIn/> */}
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<><TodoList todos={this.state.unplannedEvents}/><CalendarClass events={this.state.currentEvents} userID={this.state.userID}/></>} />
          <Route path="/share/appointment" element={<AppointmentShare userID={this.state.userID} />} />
          <Route path="/share/calendar" element={<TodoShare userID={this.state.userID} />} />
          <Route exact path ='/metrics' element={<Metrics />}></Route>
          <Route exact path ='/forms' element={<> <TodoCreate userID={this.state.userID} categories={this.state.categories}/>
          <CategoryCreate userID={this.state.userID}/> <DeleteButton todoID={this.state.todoID}/></>}></Route>
          <Route path ="/settings" element ={<>settings</>}></Route>
          <Route path ="/signout"  element ={<>signout</>}></Route>
        </Routes>
      </BrowserRouter>}
      {!status && <Landing/>}
      </>
    )
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
