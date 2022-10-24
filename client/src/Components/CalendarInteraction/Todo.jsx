import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'red'
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.categories.length !== prevProps.categories.length) {
      for (var i = 0; i < this.props.categories.length; i++) {
        if (this.props.todo.category_id === this.props.categories[i].value) {
          this.setState({
            backgroundColor: this.props.categories[i].color
          })
        }
      }
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