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
  console.log(days);

  return (
    <div>
      <h3>Calendar Component</h3>
      <div className="multi-event-calendar">
        {days.map((day, i) => {
          if (i >= 7) return;
          let classes = "multi-event-day day-name";
          if (config?.weekends.indexOf(1 * day.toFormat("c")) > -1)
            classes += " weekend";
          return (
            <div className={classes}>
              <span>{day.toFormat("ccc")}</span>
            </div>
          );
        })}
        {days.map((day) => {
          let classes = "multi-event-day";
          if (day.toFormat("d") == "1") classes += " month-first-day";
          if (config?.weekends.indexOf(1 * day.toFormat("c")) > -1)
            classes += " weekend";
          return (
            <div className={classes}>
              <span>{day.toFormat("d")}</span>
            </div>
          );
        })}
      </div>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <div style={{ color: event.color }}>
              <strong>{event.time.toISO()}</strong>: {event.title}
            </div>
          </li>
        ))}
      </ul>
      {/* Additional calendar component logic here */}
    </div>
  );
}

export default Calendar;
