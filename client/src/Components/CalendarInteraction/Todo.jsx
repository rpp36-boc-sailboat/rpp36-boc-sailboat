import React from "react";
import Paper from '@mui/material/Paper';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: props.color,
      textColor: props.textColor,
    };
  }

  render() {
    return (
      <div
        className="singleTodo"
        data-todoid={this.props.todo.todo_id}
        data-index={this.props.index}
        background={this.props.color}
        text={this.props.textColor}
        style={{boxShadow: '0px 1px 15px 1px', width: '300px', height: '50px', borderColor: this.props.color,
        'border': '1px solid', color: this.props.color, borderRadius: '3px'}}
      >
        <h4 style={{ position: 'absolute', top: '50%', left: '50%', textAlign: 'center',
        transform: 'translateY(-50%) translateX(-50%)', margin: '0', fontFamily: 'Open Sans, sans-serif',
        fontWeight: 'lighter'}}>{this.props.todo.task}</h4>
      </div>
    );
  }
}

export default Todo;
