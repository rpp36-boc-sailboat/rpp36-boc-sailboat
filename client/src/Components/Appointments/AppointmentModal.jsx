import React, {useState} from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function ({isOpen, onClose, onEventAdded, userID}) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    let eventObj = {
      userID: userID,
      taskName: title,
      description: '',
      category: 1,
      start: start,
      end: end,
      completed: false,
      appointment: true,
    };

    axios.post('/todo', eventObj)
    .then((result) => {
      onEventAdded({
        id: result.data[0].todo_id,
        title,
        start,
        end,
      });
    }).catch((err) => {
      alert('Could not add appointment.');
    })
    onClose();
  }

  return (
    <Modal overlayClassName='Overlay' className='Modal' isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <div>
          <CloseIcon fontSize='small' style={{float: 'right'}} onClick={() => onClose()}/>
          <label>Task Name</label>
          <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Start</label>
          <input type="datetime-local" onChange={e => setStart(e.target.value)} />
        </div>
        <div>
          <label>End</label>
          <input type="datetime-local" onChange={e => setEnd(e.target.value)} />
        </div>
        <Button variant="contained" style={{marginTop: '15px'}}>Create Appointment</Button>
      </form>
    </Modal>
  )
}