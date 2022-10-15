import React from 'react';

class ClickTask extends React.Component {
  constructor(props); {
    super(props);
  }

  // increase z-index

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