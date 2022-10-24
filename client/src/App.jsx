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
import Navbar from "./components/Navbar/Nav.jsx"

Modal.setAppElement('#app');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      todoID: 104,
      todos: [],
      categories: [
        {key: 'None', value: 0},
        {key: 'Option 1', value: 1},
        {key: 'Option 2', value: 2},
        {key: 'Option 3', value: 3},
        {key: 'Option 4', value: 4},
        {key: 'Option 5', value: 5},
        {key: 'Other', value: 6}
      ],
      currentEvents: [{id: 4, title: 'newEvent', date: '2022-10-17'}]
    };
  }

  componentDidMount() {
    axios.get('/todos', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      this.setState({...this.state, todos: result.data});
    })

    axios.get('/categories', {
      params: {
        id: this.state.userID
      }
    })
    .then(result => {
      const categories = result.data.map((option, i) => {
        return {key: option.category, value: option.category_id}
      });
      this.setState({...this.state, categories})
    });
  }

  render() {
    return (
      <BrowserRouter>
        {/* <div>
          <div>Encompass</div> */}
          {/* <SignUp />
          <SignIn/> */}
        {/* <Navbar/> */}
        <Routes>
          <Route path ="/" element ={<Navbar/>}>
          {/* <Route exact path="/" element={<CalendarClass events={this.state.currentEvents} userID={this.state.userID} />} /> */}
            <Route path="/share/appointment" element={<AppointmentShare userID={this.state.userID} />} />
            <Route path="/share/calendar" element={<TodoShare userID={this.state.userID} />} />
            <Route path="metrics" element={<Metrics />} />
          </Route>
        </Routes>


          {/* <h1>THIS CREATES A TODO ENTRY</h1>
          <TodoCreate userID={this.state.userID} categories={this.state.categories}/>
          <h1>THIS CREATES A CATEGORY</h1>
          <CategoryCreate userID={this.state.userID}/>
          <h1>THIS DELETES SOMETHING</h1>
          <DeleteButton todoID={this.state.todoID}/>
          <TodoList todos={this.state.todos} /> */}

      </BrowserRouter>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
