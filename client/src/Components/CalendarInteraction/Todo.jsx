import React from 'react';

const Todo = (props) => {
  console.log(props.todo);
  return (
    <div id='singleTodo'>
      <h3>{props.todo.task}</h3>
    </div>
  )
}

export default Todo;