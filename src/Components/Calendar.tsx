import { DateHelper } from "../Helpers/DateHelper";
import { DateTime } from "luxon";
import { DefaultConfig } from "./MultiEvent";
import { MultiEventConfig,Event } from "./MultiEvent";

export interface CalendarProps {
  events?: Event[];
  now?: DateTime
  config?: MultiEventConfig
  today?:DateTime
  weekStart?: number
}

export const Calendar = (props: CalendarProps): JSX.Element => {
  // props casting to local variable
  // This is very important as we need all props to be nullable in calling the Calendar inside multievent
  const now = props.now ?? DateTime.now();
  const config = { ...DefaultConfig, ...props.config };
  const events = props.events??[];
  const weekStart = props.weekStart??DefaultConfig.weekstart;
  const today = props.today??DateTime.now();

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
      {days.filter((dy,ind)=>ind<7).map((day, i) => {
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
        let classes = "me-day";
        if (day.toFormat("d") == "1") classes += " month-first-day";
        if (config?.weekends.indexOf(parseInt(day.toFormat("c"))) > -1)
          classes += " weekend";
        if (today.toFormat("yyyy M dd") == day.toFormat("yyyy M dd"))
          classes += " today";
        return (
          <div className={classes} key={i}>
            <span>{day.toFormat("d")}</span>
            <div className="me-events-container">
              {dayEvents.map((event:Event,ii) => (
                <div key={ii} className="me-event">
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
  );
};

export default Calendar;
