import React from "react";
import { Event, CalendarProps } from "../../types";

function Calendar({ config, events, now }: CalendarProps): JSX.Element {
  let weekday = now.toFormat("c");
  const currentMonth = now.toFormat("m");
  const toDecrease = weekday - 1;
  let startDay = now.minus({ days: toDecrease });
  let days = [];
  let lastDay = startDay;
  let firstDayOfMonthCount = 0;
  while (firstDayOfMonthCount < 2) {
    days.push(startDay);
    startDay = startDay.plus({ days: 1 });
    if (startDay.toFormat("d") == "1") firstDayOfMonthCount++;
  }
  if (days.length % 7 != 0) {
    const daysToAdd = 6 - (days.length % 7);

    for (let i = 0; i <= daysToAdd; i++) {
      days.push(startDay.plus({ days: i }));
    }
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
