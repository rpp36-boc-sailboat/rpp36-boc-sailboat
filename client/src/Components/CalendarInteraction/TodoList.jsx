import React from 'react';
import axios from 'axios';
import Todo from './Todo.jsx';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   todos: []
    // }
  }

  // componentDidMount() {
  //   this.setState({todos: [...this.props.todos]});
  // }
  // componentDidUpdate() {
  //   if (this.state.todos !== this.props.todos) {
  //     this.setState({todos: this.props.todos});
  //   }
  // }

  render() {
    // if (this.state.todos) {
      console.log(Array.isArray(this.props.todos));
      return (
        <div id='taskList'>
          <form>
            <ul>
              {this.props.todos.map((todo) => <Todo todo={todo} />)}
            </ul>
          </form>
        </div>
      )
    // } else {
    //   console.log('in the else', this.state.todos);
    //   return (
    //     <div>
    //       <p>Hello World</p>
    //     </div>
    //   )
    // }
  }
}

export default TodoList;