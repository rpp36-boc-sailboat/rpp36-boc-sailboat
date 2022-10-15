import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import SignIn from "./Components/Accounts/SignIn.jsx";
import SignUp from "./Components/Accounts/SignUp.jsx";
import Metrics from "./Components/Metrics/index.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1,
    };
  }

  render() {
    return (
      <div>
        <div>Encompass</div>
        <SignUp />
        <Metrics />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
