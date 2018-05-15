import React from 'react';

const Event = ({ thisEvent, removeEventAction, sendEventAction }) => {


  const handleButtonClick = (event) => {
    event.preventDefault()
    removeEventAction(thisEvent.id)
  }

  const handleUpdateButtonClick = (event) => {
    event.preventDefault()
    sendEventAction(thisEvent)
  }

  return (
    <li className="events">
      <div className="title">
        {thisEvent.title}
      </div>
      <div className="location">
        Location: {thisEvent.location}
      </div>
      <div className="date">
        Date: {thisEvent.date}
      </div>
      <div className="dresscode">
        Dresscode: {thisEvent.dresscode}
      </div>
      <div className="attendees">
        Attendees: {thisEvent.attendees}
      </div>
      <button className="bton" onClick={handleButtonClick}>
        Remove Event
      </button>
      <button className="bton" onClick={handleUpdateButtonClick}>
        Edit Event
      </button>
    </li>
  );
};

export default Event;
