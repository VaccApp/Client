import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
require("moment/locale/es.js");

const localizer = BigCalendar.momentLocalizer(moment);
//array de eventos
const myEventsList = [
  {
    title: "today",
    start: new Date("2019-05-05 10:22:00"),
    end: new Date("2019-05-05 10:42:00"),
  },
  {
    title: "string",
    start: new Date("2019-05-05 12:22:00"),
    end: new Date("2019-05-05 13:42:00"),
  },
];
class EventsCalendar extends Component {
  render() {
    return (
      <div style={{ height: `${400}px` }} className="bigCalendar-container">
        <BigCalendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          messages={{
            next: "sig",
            previous: "ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>
    );
  }
}
