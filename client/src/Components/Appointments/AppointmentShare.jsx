import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import BookAptModal from './BookAptModal.jsx'
import Modal from 'react-modal';
import axios from 'axios';


class AppointmentShare extends React.Component {
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
    axios.get('/appointments', {
      params: {
        id: this.props.userID
      }
    }).then((result) => {
      result.data.map((option, i) => {
        newApts.push(option)
      })
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
        <BookAptModal isOpen={this.state.bookOpen} onClose={this.closeModal.bind(this)} onEventBooked={e => this.onEventBooked(e)} selectedEventID={this.state.selectedEventID} />
      </React.Fragment>
    );
  }
}

export default AppointmentShare;