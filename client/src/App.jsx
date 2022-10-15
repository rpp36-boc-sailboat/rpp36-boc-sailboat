import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import SignIn from "./Components/Accounts/SignIn.jsx";
import SignUp from "./Components/Accounts/SignUp.jsx";
import Metrics from "./Components/Metrics/index.jsx";
import Calendar from "./Components/Calendar.jsx";
import TodoCreate from './Components/Forms/TodoCreate.jsx';
import CategoryCreate from './Components/Forms/CategoryCreate.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
      categories: [
        {key: 'None', value: 'none'},
        {key: 'Option 1', value: 'option1'},
        {key: 'Option 2', value: 'option2'},
        {key: 'Option 3', value: 'option3'},
        {key: 'Option 4', value: 'option4'},
        {key: 'Option 5', value: 'option5'},
        {key: 'Other', value: 'other'}
      ]
    };
  }

  render() {
    return (
      <div>
        <div>Encompass</div>
        <SignUp />
        <Metrics />
        <Calendar />
        <h1>THIS CREATES A TODO ENTRY</h1>
        <TodoCreate categories={this.state.categories}/>
        <h1>THIS CREATES A CATEGORY</h1>
        <CategoryCreate />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;