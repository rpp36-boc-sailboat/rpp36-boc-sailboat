import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-modal';
import axios from 'axios';


class TodoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      appointments: [],
      bookOpen: false,
      selectedEvent: null,
      selectedEventID: null,
    }
    this.closeModal.bind(this);
    this.handleEventClick.bind(this);
    this.onEventBooked.bind(this);
    this.appointmentRef = React.createRef(null);
  }

  componentDidMount() {
    let newApts = [];

    const url = new URLSearchParams(window.location.search);
    const id = url.get('user_id');

    axios.get('/todos', {
      params: {
        id: id
      }
    }).then((result) => {
      if (result.data.length > 0) {
        result.data.map((option, i) => {
          if (option.appointment === false) {
            newApts.push(option)
          }
        })
      }
      console.log(newApts);
      return newApts;
    }).then((apts) => {
      this.setState({appointments: apts}, () => {
        let appointmentApi = this.appointmentRef.current.getApi();
        this.state.appointments.forEach((apt) => {
          let event = {
            id: apt.todo_id,
            title: apt.task,
            start: apt.start_time,
            end: apt.end_time,
          }
          appointmentApi.addEvent(event);
        })
      })
    })
  }

  closeModal() {
    this.setState({modalOpen: false, bookOpen: false});
  }

  handleEventClick(e) {
    this.setState({bookOpen: true, selectedEvent: e, selectedEventID: e.event.id});
  }
  onEventBooked(e) {
    this.state.selectedEvent.event.remove();
    this.setState({selectedEvent: null, selectedEventID: null});
  }

  render() {
    return (
      <React.Fragment>
        <FullCalendar
          ref={this.appointmentRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          views={{dayGridMonth: { titleFormat: {year: 'numeric', month: 'short'}}, day: { titleFormat: {year: 'numeric', month: 'short', day: '2-digit'}}}}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={this.state.appointments}
          eventClick={this.handleEventClick.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default TodoShare;