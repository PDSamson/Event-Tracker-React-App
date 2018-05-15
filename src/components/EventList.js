import React from 'react';
import Event from './Event'
import EventForm from './EventForm'
import EventUpdateForm from './EventUpdateForm'
import store from '../store'
import { getEventsFunction, createEventFunction, deleteEventFunction,
updateEventFunction } from '../api';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], updatingEvent: false, feedback: '',
    eventToUpdate: null};
  }
  componentDidMount() {
    getEventsFunction()
      .then(data => {
        this.setState({ events: data.events })
        if (data.events === []) {
          this.setState({ feedback: 'You have no events'})
        }
      })
      .catch(() => {
        this.setState({ feedback: 'Could not get events'})
      })
  }
  createEventAction = (newTitle, newLocation, newDate, newDresscode, newAttendees) => {
    const newEvent = {event:{
      title:newTitle,
      location:newLocation,
      date:newDate,
      dresscode:newDresscode,
      attendees:newAttendees
      }
    }
    createEventFunction(newEvent)
      .then((response) => {
        const addition = response.event
        this.setState({
          events: this.state.events.concat(addition)
        })
        this.setState({ feedback: 'Event created'})
      })
      .catch(() => {
        this.setState({ feedback: 'Event creation failed'})
      })
  }
  deleteEventAction = (id) => {
    deleteEventFunction(id)
      .then(() => {
        const currentEvents = this.state.events
        const events = currentEvents.filter(event => event.id !== id)
        this.setState({ events })
        this.setState({ feedback: 'Event deleted'})
      })
      .catch(() => {
        this.setState({ feedback: 'Delete failed'})
      })
  }
  updateEventAction = (id, updatedEvent) => {
    store.id = id
    updateEventFunction(updatedEvent)
      .then(() => {
        const currentEvents = this.state.events
        const index = currentEvents.findIndex((element) => element.id === id)
        currentEvents[index] = updatedEvent.event
        this.setState({ currentEvents }, () => {
          this.setState({ updatingEvent: false })
        })
        this.setState({ feedback: 'Event Updated' })

      })
      .catch(() => {
        this.setState({ feedback: 'Update failed'})
      })
  }
  setUpdateAction = ( newUpdate ) => {
    this.setState({ eventToUpdate: newUpdate }, () => {
      this.setState({ updatingEvent: true })
    })
  }
  render() {
    const { updatingEvent } = this.state;
    return (
      <div className="events">
        <div className="response-field">{this.state.feedback}</div>
        <EventForm addEventAction={this.createEventAction} />
        { updatingEvent
          ? <EventUpdateForm thisEvent={this.state.eventToUpdate} changeEventAction={this.updateEventAction} />
          : <div></div>
        }
        <ul className="event-list">
          {this.state.events.map(thisEvent => {
            return (
              <Event
                key={thisEvent.id}
                thisEvent={thisEvent}
                removeEventAction={this.deleteEventAction}
                sendEventAction={this.setUpdateAction}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default EventList;
