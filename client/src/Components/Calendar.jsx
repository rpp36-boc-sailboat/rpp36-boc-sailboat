import React, {useRef} from "react";
import ReactDOM from "react-dom/client";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import AddEventModal from './Appointments/AppointmentModal.jsx'
import BookAptModal from './Appointments/BookAptModal.jsx'
import ClickTask from './CalendarInteraction/ClickTask.jsx'
import axios from 'axios'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      modalOpen: false,
      modalTask: false,
      selectedTaskID: null,
      selectedTask: null
    }
    this.onEventAdded.bind(this);
    this.closeModal.bind(this);
    this.shareClick.bind(this);
    this.eventDropped.bind(this);
    this.eventEditTime.bind(this);
    this.toDoDropped.bind(this);
    this.calendarRef = React.createRef(null);
  }

  onEventAdded(e) {
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.addEvent(e);
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  closeTask() {
    this.setState({modalTask: false});
  }

  componentDidMount() {
      let containerEl = document.getElementById('taskList');
      new Draggable(containerEl, {
      longPressDelay: 500,
      itemSelector: '.singleTodo',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('background'),
          borderColor: eventEl.getAttribute('background'),
          textColor: eventEl.getAttribute('text')
        };
      }
    })
  }

  handleEventClick(e) {
    this.setState({modalTask: true, selectedTaskID: e.event.toPlainObject().extendedProps.todo_id, selectedTask: e});
  }

  shareClick(e) {
    var link;
    if (e.target.attributes[5].value === 'calendar') {
      link = window.location.href + `share/calendar/?user_id=${this.props.userID}`;
    } else {
      link = window.location.href + `share/appointment/?user_id=${this.props.userID}`;
    }
    var aux = document.createElement('input');
    aux.setAttribute('value', link);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    alert(`Share link copied to clipboard.`);
  }

  eventDropped(e) {
    let event = {
      start: e.event.toPlainObject().start,
      end: e.event.toPlainObject().end || null,
      id: e.event.toPlainObject().extendedProps.todo_id,
    }
    axios.put('/todo', event)
    .catch((err) => {
      alert('unable to edit this event.');
    });
  }

  eventEditTime(e) {
    let event = {
      start: e.event.toPlainObject().start,
      end: e.event.toPlainObject().end || null,
      id: e.event.toPlainObject().extendedProps.todo_id,
    }
    axios.put('/todo', event)
    .catch((err) => {
      alert('unable to edit this event.');
    });
  }

  toDoDropped (info) {
    let time = info.dateStr;
    let todo_id = info.draggedEl.getAttribute('data-todoid');
    let index = info.draggedEl.getAttribute('data-index');
    axios.put('/setTime', {
      todo_id,
      time
    })
    this.props.plannedToDo(index);
  }

  render() {
    return (
      <React.Fragment>
        <ul style={{marginTop: '5px', padding: 'unset'}}>
          <li>
            <Tooltip title="Create Appointment" placement="bottom-end" arrow>
              <InsertInvitationIcon onClick={() => this.setState({modalOpen: true})} />
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Share To-dos" placement="bottom-end" arrow>
              <CalendarMonthIcon sx={{my: 0.1}} value={'calendar'} onClick={this.shareClick.bind(this)}>calendar</CalendarMonthIcon>
            </Tooltip>
          </li>
          <li>
            <Tooltip title="Share Appointments" placement="bottom-end" arrow>
              <EventAvailableIcon value={'appointment'} onClick={this.shareClick.bind(this)}>appointment</EventAvailableIcon>
            </Tooltip>
          </li>
        </ul >
        <FullCalendar
          ref={this.calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: 'title',
            center: '',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          footerToolbar={{
            left: 'prev,next',
            right: 'today'
          }}
          initialView='dayGridMonth'
          views={{dayGridMonth: { titleFormat: {year: 'numeric', month: 'short'}}, day: { titleFormat: {year: 'numeric', month: 'short', day: '2-digit'}}}}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventDrop={this.eventDropped.bind(this)}
          eventResize={this.eventEditTime.bind(this)}
          events={this.props.events}
          eventClick={this.handleEventClick.bind(this)}
          draggable={true}
          drop={(info) => {this.toDoDropped(info)}}
        />
        <AddEventModal isOpen={this.state.modalOpen} onClose={this.closeModal.bind(this)} onEventAdded={e => this.onEventAdded(e)} userID={this.props.userID} />
        {this.state.modalTask === true ? <ClickTask isOpen={this.state.modalTask} taskID={this.state.selectedTaskID} taskEvent={this.state.selectedTask} onClose={this.closeTask.bind(this)}/> : null}
      </React.Fragment>
    );
  }
}

export default CalendarClass;