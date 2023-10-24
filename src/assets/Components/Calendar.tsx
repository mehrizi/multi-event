import React from "react";
import { Event, CalendarProps } from "../../types";
import { DateHelper } from "../Helpers/DateHelper";

function Calendar({ config, events, now }: CalendarProps): JSX.Element {
  const monthStart = DateHelper.monthStart(now);
  const monthEnd = DateHelper.monthEnd(now);
  const calendarStart = DateHelper.weekStart(monthStart);
  const calendarEnd = DateHelper.weekEnd(monthEnd);
  let calendarNow = calendarStart.plus({days:0});
  const days = [];
  while (calendarNow.toMillis() < calendarEnd.toMillis()) {
    days.push(calendarNow);
    calendarNow = calendarNow.plus({ days: 1 });
  }

  const getDayEvents = (day: luxon) => {
    return events?.filter((event) => {
      return event.time.toFormat("yyyy-MM-dd") == day.toFormat("yyyy-MM-dd");
    });
  };
  return (
    <div>
      <h3>Calendar Component</h3>
      <div className="me-calendar">
        {days.map((day, i) => {
          if (i >= 7) return <span />;
          let classes = "me-day day-name";
          if (config?.weekends.indexOf(1 * day.toFormat("c")) > -1)
            classes += " weekend";
          return (
            <div className={classes} key={i}>
              <span>{day.toFormat("ccc")}</span>
            </div>
          );
        })}
        {days.map((day, i) => {
          let dayEvents = getDayEvents(day);
          let classes = "me-day";
          if (day.toFormat("d") == "1") classes += " month-first-day";
          if (config?.weekends.indexOf(1 * day.toFormat("c")) > -1)
            classes += " weekend";
          return (
            <div className={classes} key={i}>
              <span>{day.toFormat("d")}</span>
              <div className="me-events-container">
                {dayEvents.map((event) => (
                  <div className="me-event">
                    <i
                      className="dot"
                      style={{ background: event.color ?? "#00F" }}
                    ></i>
                    <span>
                      <span className="me-event-time">
                      {event.time.toFormat("HH:mm")}
                      </span>
                      {event.title}
                      </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
