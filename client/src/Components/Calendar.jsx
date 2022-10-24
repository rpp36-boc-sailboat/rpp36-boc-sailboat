import React, {useRef} from "react";
import ReactDOM from "react-dom/client";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import AddEventModal from './Appointments/AppointmentModal.jsx'
import BookAptModal from './Appointments/BookAptModal.jsx'
import axios from "axios";

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      modalOpen: false,
    }
    this.addEvents = this.addEvents.bind(this);
    this.onEventAdded.bind(this);
    this.closeModal.bind(this);
    this.shareClick.bind(this);
    this.calendarRef = React.createRef(null);
  }

  addEvents(title, date) {
    let current = this.state.currentEvents;
    current.push({
      title, date
    })
    this.setState({
      current
    });
  }

  onEventAdded(e) {
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.addEvent(e);
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  componentDidMount() {
      let containerEl = document.getElementById('taskList');
      new Draggable(containerEl, {
      longPressDelay: 500,
      itemSelector: '.singleTodo',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    })
  }

  shareClick(e) {
    if (e.target.value === 'calendar') {
      let link = window.location.href + `share/calendar/?user_id=${this.props.userID}`;
      var aux = document.createElement('input');
      aux.setAttribute('value', link);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);

      // navigator.clipboard.writeText(link).then((x) => {
        alert(`${link} copied to clipboard.`);
      // })
    } else {
      let link = window.location.href + `share/appointment/?user_id=${this.props.userID}`;
      var aux = document.createElement('input');
      aux.setAttribute('value', link);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      // navigator.clipboard.writeText(link).then((x) => {
        alert(`${link} copied to clipboard.`);
      // })
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({modalOpen: true})}>Add Appointment</button>
        <button value='calendar' onClick={this.shareClick.bind(this)}>Share Calendar</button>
        <button value='appointment' onClick={this.shareClick.bind(this)}>Share Appointment</button>
        <FullCalendar
          ref={this.calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          views={{dayGridMonth: { titleFormat: {year: 'numeric', month: 'short'}}, day: { titleFormat: {year: 'numeric', month: 'short', day: '2-digit'}}}}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={this.props.events}
          draggable={true}
          drop= {function(info) {
              info.draggedEl.parentNode.removeChild(info.draggedEl);
              let time = info.dateStr;
              let todo_id = info.draggedEl.getAttribute('todoId');
              axios.put('/setTime', {
                todo_id,
                time
              })
          }}
        />
        <AddEventModal isOpen={this.state.modalOpen} onClose={this.closeModal.bind(this)} onEventAdded={e => this.onEventAdded(e)} userID={this.props.userID} />
      </React.Fragment>
    );
  }
}

export default CalendarClass;