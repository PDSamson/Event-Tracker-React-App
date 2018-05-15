import React, { Component } from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = { titleValue: '',
      locationValue: '',
      dateValue: '',
      dresscodeValue: '',
      attendeesValue: ''
    }
  }

  handleButtonClick = (event) => {
    event.preventDefault()

    this.props.addEventAction(
      this.state.titleValue,
      this.state.locationValue,
      this.state.dateValue,
      this.state.dresscodeValue,
      this.state.attendeesValue
    )

    this.setState({ titleValue: event.target.value })
    this.setState({ locationValue: event.target.value })
    this.setState({ dateValue: event.target.value })
    this.setState({ dresscodeValue: event.target.value })
    this.setState({ attendeesValue: event.target.value })
  }

  handleTitleChange = (event) => {
    this.setState({ titleValue: event.target.value })
  }
  handleLocationChange = (event) => {
    this.setState({ locationValue: event.target.value })
  }
  handleDateChange = (event) => {
    this.setState({ dateValue: event.target.value })
  }
  handleDresscodeChange = (event) => {
    this.setState({ dresscodeValue: event.target.value })
  }
  handleAttendeesChange = (event) => {
    this.setState({ attendeesValue: event.target.value })
  }
  render() {
    return (
      <div className="Form">
        <input type="text" placeholder="title"
          value={this.state.titleValue}
          onChange={this.handleTitleChange}
        />
        <input type="text" placeholder="location"
          value={this.state.locationValue}
          onChange={this.handleLocationChange}
        />
        <input type="text" placeholder="date"
          value={this.state.dateValue}
          onChange={this.handleDateChange}
        />
        <input type="text" placeholder="dresscode"
          value={this.state.dresscodeValue}
          onChange={this.handleDresscodeChange}
        />
        <input type="text" placeholder="attendees"
          value={this.state.attendeesValue}
          onChange={this.handleAttendeesChange}
        />
        <button className="btn btn-default" onClick={this.handleButtonClick}>
          Add Event
        </button>
      </div>
    )
  }
}

export default EventForm
