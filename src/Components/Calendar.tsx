import { DateHelper } from "../Helpers/DateHelper";
import { DateTime } from "luxon";
import { DefaultConfig } from "./MultiEvent";
import { MultiEventConfig, Event } from "./MultiEvent";
import Day from "./Day";

export interface CalendarProps {
  events?: Event[];
  now?: DateTime;
  config?: MultiEventConfig;
  today?: DateTime;
  weekStart?: number;
}

export const Calendar = (props: CalendarProps): JSX.Element => {
  // props casting to local variable
  // This is very important as we need all props to be nullable in calling the Calendar inside multievent
  const now = props.now ?? DateTime.now();
  const config = { ...DefaultConfig, ...props.config };
  const events = props.events ?? [];
  const weekStart = props.weekStart ?? DefaultConfig.weekstart;
  const today = props.today ?? DateTime.now();

  // Now calculate the calendar boundaries
  const monthStart = DateHelper.monthStart(now);
  const monthEnd = DateHelper.monthEnd(now);
  const calendarStart = DateHelper.weekStart(monthStart, weekStart);
  const calendarEnd = DateHelper.weekEnd(monthEnd, weekStart);
  let calendarNow = calendarStart.plus({ days: 0 });
  const days = [];
  while (calendarNow.toMillis() <= calendarEnd.toMillis()) {
    days.push(calendarNow);
    calendarNow = calendarNow.plus({ days: 1 });
  }

  const getDayEvents = (day: DateTime) => {
    return events.filter((event) => {
      return event.time.toFormat("yyyy-MM-dd") == day.toFormat("yyyy-MM-dd");
    });
  };
  return (
    <div className="me-calendar">
      {days
        .filter((_dy, ind) => ind < 7)
        .map((day, i) => {
          let classes = "me-day day-name";
          if (config.weekends.indexOf(parseInt(day.toFormat("c"))) > -1)
            classes += " weekend";
          return (
            <div className={classes} key={i}>
              <span>{day.toFormat("ccc")}</span>
            </div>
          );
        })}
      {days.map((day, i) => {
        const dayEvents = getDayEvents(day);
        return (
          <Day
            key={i}
            events={dayEvents}
            weekends={config.weekends}
            day={day}
            today={today}
          />
        );
      })}
    </div>
  );
};

export default Calendar;
