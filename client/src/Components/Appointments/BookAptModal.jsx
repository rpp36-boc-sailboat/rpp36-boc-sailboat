import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default function ({isOpen, onClose, onEventBooked, selectedEventID}) {

  const onSubmit = (e) => {
    e.preventDefault();
    axios.put('/bookedApt', {selectedEventID})
    .then((res => {
      onEventBooked();
    })).catch((err) => {
      alert('unable to book event');
    })
    onClose();
  }
  return (
    <Modal style={{content: {width: '250px', height: '200px'}, overlay: {color: 'grey', zIndex: 99999}}} isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>Would you Like to book this appointment? for id {selectedEventID}
        <div>
          <button>Book Appointment</button>
        </div>
      </form>
    </Modal>
  )
}