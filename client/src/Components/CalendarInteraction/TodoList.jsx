import React from 'react';
import axios from 'axios';

class TodoList extends React.Component {
  constructor(props); {
    super(props);
  }

  taskPanel () {
    for (var i = 0; i < todos.length; i++) {

    }
  }

  render() {
    return (
      <div id='taskList'>
        <form>
          <ul>
            {this.props.todos.map((todo) => <Todo todo={todo} />)}
          </ul>
        </form>
      </div>
    )
  }
}