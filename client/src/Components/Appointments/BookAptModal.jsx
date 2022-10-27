import React, {useState} from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function ({isOpen, onClose, onEventBooked, selectedEventID, selectedEvent}) {

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
    <Modal overlayClassName='Overlay' className='Modal' isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
          <CloseIcon fontSize='small' style={{float: 'right', top: '5px', right: '5px'}} onClick={() => onClose()}/>
        <div>
          <label>Appointment Booking</label>
        </div>
        <div>
          <p>Would you like to <br/>book this appointment?</p>
        </div>
      <Button variant="contained" style={{marginTop: '15px'}}>Book Appointment</Button>
      </form>
    </Modal>
  )
}