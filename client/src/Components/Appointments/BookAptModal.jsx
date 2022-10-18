import React, {useState} from 'react';
import Modal from 'react-modal';

export default function ({isOpen, onClose}) {
  const [title, setTitle] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(onClose);
    onClose();
  }
  return (
    <Modal style={{content: {width: '250px', height: '200px'}, overlay: {color: 'grey', zIndex: 99999}}} isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>Would you Like to book this appointment?
        <button>Book Appointment</button>
      </form>
    </Modal>
  )
}