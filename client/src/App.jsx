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
        {key: 'None', value: 0},
        {key: 'Option 1', value: 1},
        {key: 'Option 2', value: 2},
        {key: 'Option 3', value: 3},
        {key: 'Option 4', value: 4},
        {key: 'Option 5', value: 5},
        {key: 'Other', value: 6}
      ]
    };
  }

  componentDidMount() {
    let categories = [];
    axios.get('/categories')
    .then(result => result.data.map((option, i) => {
      return categories.push({key: option.category, value: option.category_id})
    }))
    .then(this.setState({
      categories: categories
    }))
  }

  render() {
    return (
      <div>
        <div>Encompass</div>
        <SignIn />
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