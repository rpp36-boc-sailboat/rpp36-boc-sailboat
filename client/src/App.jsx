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
      userID:1,
      todoID: 104,
      todos: [],
      categories: [],
      currentEvents: [],
      unplannedEvents: []
    };
  }

  componentDidMount() {
    axios.get('/todos', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      let currentEvents = [];
      let unplannedEvents = [];
      result.data.forEach((todo) => {
        var {todo_id, task, start_time, end_time} = todo;
        if (start_time === undefined) unplannedEvents.push(todo);
        else currentEvents.push({todo_id, title: task, start: start_time, end: end_time});
      })
      this.setState({...this.state, todos: result.data, currentEvents, unplannedEvents});
    })

    axios.get('/categories', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      const categories = result.data.map((option, i) => {
        return {key: option.category, value: option.category_id, color: option.color}
      });
      this.setState({...this.state, categories})
    });
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
          <Route path="/" element={<>{<TodoList todos={this.state.todos} />}<CalendarClass events={this.state.currentEvents} userID={this.state.userID}/></>}/>
          <Route path="/share/appointment" element={<AppointmentShare userID={this.state.userID} />} />
          <Route path="/share/calendar" element={<TodoShare userID={this.state.userID} />} />
          {/* </Route> */}
          <Route path ='/metrics' element={<Metrics />}></Route>
          <Route path ='/forms' element={<> <TodoCreate userID={this.state.userID} categories={this.state.categories}/>
          <CategoryCreate userID={this.state.userID}/> <DeleteButton todoID={this.state.todoID}/></>}></Route>
          <Route path ="/settings" element ={<>settings</>}></Route>
          <Route path ="/signout"  element ={<>signout</>}></Route>
        </Routes>
      </BrowserRouter>}
      {!status&& <Landing/>}
      </>


    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
