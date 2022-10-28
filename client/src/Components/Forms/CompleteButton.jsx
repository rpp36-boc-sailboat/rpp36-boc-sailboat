import React from 'react';
import axios from 'axios';

class CompleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick() {
    axios.put('/complete', {
      todoID: this.props.todoID,
      // complete: this.props.complete
    })
    .then(result => console.log(result))
  }

  render() {
    return (
      <button onClick={this.handleClick}>COMPLETE</button>
    );
  }
}

export default CompleteButton;