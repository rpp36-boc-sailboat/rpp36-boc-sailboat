import React from 'react';
import axios from 'axios';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick(e) {
    axios.delete('/todos', {
      params: {
        todoID: this.props.todoID
      }
    })
    .then(console.log('TODO SUCCESSFULLY DELETED'))
  }

  render() {
    return (
      <button onClick={this.handleClick}>DELETE</button>
    );
  }
}

export default DeleteButton;