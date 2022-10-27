import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

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
        <Modal overlayClassName='Overlay' className='Modal' isOpen={this.props.isOpen} onRequestClose={this.props.onClose}>
          <div id='detailedTask'>
          <CloseIcon fontSize='small' style={{float: 'right', top: '5px', right: '5px', cursor: 'pointer'}} onClick={() => this.props.onClose()}/>
            <h3>{this.state.currentTask.task}</h3>
            <p>Date: {(new Date(this.state.currentTask.start_time).toLocaleDateString())} - {(new Date(this.state.currentTask.end_time).toLocaleDateString())}<br/>
            Time: {(new Date(this.state.currentTask.start_time).toLocaleTimeString())} - {(new Date(this.state.currentTask.end_time).toLocaleTimeString())}</p>
            <p>Description: {this.state.currentTask.description}</p>
            <Tooltip title="Delete Task" placement="bottom-end" arrow>
              <DeleteIcon style={{cursor: 'pointer'}} onClick={() => this.deleteTask()}/>
            </Tooltip>
          </div>
        </Modal>
      )
    }
  }
}

export default ClickTask;