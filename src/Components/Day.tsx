import { DateTime } from "luxon";
import { Event } from "./MultiEvent";

export interface DayProps {
  day: DateTime;
  today: DateTime;
  weekends: number[]
  events?: Event[];
}

export const Day = (props: DayProps): JSX.Element => {
  const events = props.events ?? [];

  let classes = "me-day";
  if ( props.day.toFormat("d") == "1") classes += " month-first-day";
  if (props.weekends.indexOf(parseInt( props.day.toFormat("c"))) > -1)
    classes += " weekend";
  if (props.today.toFormat("yyyy M dd") ==  props.day.toFormat("yyyy M dd"))
    classes += " today";
  return (
    <div className={classes} >
      <span>{ props.day.toFormat("d")}</span>
      <div className="me-events-container">
        {events.map((event: Event, ii) => (
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
};

export default Day;
