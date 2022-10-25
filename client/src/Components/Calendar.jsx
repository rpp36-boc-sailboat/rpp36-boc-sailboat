import React, {useRef} from "react";
import ReactDOM from "react-dom/client";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import AddEventModal from './Appointments/AppointmentModal.jsx'
import BookAptModal from './Appointments/BookAptModal.jsx'
import axios from 'axios'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      modalOpen: false,
    }
    this.onEventAdded.bind(this);
    this.closeModal.bind(this);
    this.shareClick.bind(this);
    this.eventDropped.bind(this);
    this.eventEditTime.bind(this);
    this.calendarRef = React.createRef(null);
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

  componentDidUpdate(prevProps) {
    if (this.state.currentEvents.length === 0 && this.props.events.length !== 0
      && this.props.categories.length !== 0) {
      let categories = {};
      this.props.categories.forEach((category) => {
        categories[category.value] = [category.key, category.color];
      })
      this.props.events.map((event) => {
        event['backgroundColor'] = categories[event.category_id][1];
        event['borderColor'] = categories[event.category_id][1];
        event['category'] = categories[event.category_id][0];
        return event;
      });
      this.setState({
        currentEvents: this.props.events
      })
    }
  }

  shareClick(e) {
    var link;
    console.log(e.target.value);
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

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({modalOpen: true})}>Add Appointment</button>
        <CalendarMonthIcon value={'calendar'} onClick={this.shareClick.bind(this)}>calendar</CalendarMonthIcon>
        <EventAvailableIcon value={'appointment'} onClick={this.shareClick.bind(this)}>appointment</EventAvailableIcon>
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
          events={this.state.currentEvents}
          draggable={true}
          drop= {function(info) {
              info.draggedEl.parentNode.removeChild(info.draggedEl);
              let time = info.dateStr;
              let todo_id = info.draggedEl.getAttribute('data-todoid');
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