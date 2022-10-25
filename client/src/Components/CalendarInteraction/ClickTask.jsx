import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DeleteIcon from '@mui/icons-material/Delete';

class ClickTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTask: null
    }
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    axios.get('/todo', {
      params: {
        id: this.props.taskID
      }
    })
    .then(result => {
      this.setState({currentTask: result.data[0]})
    })
}

  deleteTask() {
    // current axios delete should be server? this one should just carry the todo_id and send it to an endpoint
    axios.delete('/todos', {
      params: {
        todoID: this.props.taskID
      }
    })
    .then(() => {
      this.props.taskEvent.event.remove();
      console.log('TODO SUCCESSFULLY DELETED');
    })
    this.props.onClose();
}

  render() {
    if (this.state.currentTask) {
      return (
        <Modal style={{content: {width: '250px', height: '200px'}, overlay: {color: 'black', zIndex: 99999}}} isOpen={this.props.isOpen} onRequestClose={this.props.onClose}>
          <div id='detailedTask'>
            <h3>{this.state.currentTask.task}</h3>
            <p>{(new Date(this.state.currentTask.start_time).toLocaleDateString())} - {(new Date(this.state.currentTask.end_time).toLocaleDateString())}<br/>
            {(new Date(this.state.currentTask.start_time).toLocaleTimeString())} - {(new Date(this.state.currentTask.end_time).toLocaleTimeString())}</p>
            <p>{this.state.currentTask.description}</p>
            <DeleteIcon style={{cursor: 'pointer'}} onClick={() => this.deleteTask()}/>
          </div>
        </Modal>
      )
    }
  }
}

export default ClickTask;