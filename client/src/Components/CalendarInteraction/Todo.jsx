import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: props.color
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.color !== prevProps.color) {
      this.setState({backgroundColor: this.props.color});
    }
  }

  render() {
    return (
      <div className='singleTodo' key={this.props.todo_id} style={{background: this.state.backgroundColor}}>
        <h4>{this.props.todo.task}</h4>
      </div>
    )
  }
}

export default Todo;