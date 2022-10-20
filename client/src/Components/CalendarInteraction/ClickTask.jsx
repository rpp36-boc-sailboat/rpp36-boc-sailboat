import React from 'react';
import axios from 'axios';

class ClickTask extends React.Component {
  constructor(props); {
    super(props);
  }

  // increase z-index

  handleEdit() {
    // click initilizes the view and ability to edit the todo, after edit is done send put request to server to update the database
  }

  handleSharing() {
    //handle sharing, other component
  }

  deleteTask() {
    // current axios delete should be server? this one should just carry the todo_id and send it to an endpoint
    axios.delete(`/tasks`)
    .then(res => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  backToMain() {
    //have a modal or some sort of different render based on boolean and just switch it back to original view
  }

  render() {
    return (
      <div id='detailedTask'>
        <h3>Details here</h3>
        <h5>Date of Task</h5>
        <p>Extra details:</p>
        <p>Cateogry here</p>
        {/* <i /> icon for editing*/}
        {/* <i /> icon for sharing*/}
        {/* <i /> icon for deleting*/}
        {/* <i /> icon for closing out of detailedTask*/}
      </div>
    )
  }
}