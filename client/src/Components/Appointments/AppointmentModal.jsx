import React, {useState} from 'react';
import Modal from 'react-modal';

export default function ({isOpen, onClose, onEventAdded}) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // sent eventObj to server and get an id
    let eventObj = {
      id: 'unique id',
      addDay: true,
      title: 'title',
      start: 'start time',
      end: 'end time',
      editable: false,
    };

    onEventAdded({
      title,
      start,
      end,
    });

    onClose();
  }
  return (
    <Modal style={{content: {width: '250px', height: '200px'}, overlay: {color: 'grey', zIndex: 1}}} isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div>
          <label>Start</label>
          <input type="datetime-local" onChange={e => setStart(e.target.value)} />
        </div>
        <div>
          <label>End</label>
        <input type="datetime-local" onChange={e => setEnd(e.target.value)} />
        </div>
        <button>Create Appointment</button>
      </form>
    </Modal>
  )
}