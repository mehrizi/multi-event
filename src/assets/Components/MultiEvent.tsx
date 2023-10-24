import React, { ReactNode, useEffect, useState } from "react";
import YearBar from "./YearBar";
import Calendar from "./Calendar";
import { DateTime } from "luxon";
import "./MultiEvent.scss";

import { YearBarProps, CalendarProps, MultiEventConfig } from "../../types";
import { EventFactory } from "../Helpers/EventFactory";
function MultiEvent({
  children,
  events,
  calendar = 'persian',
  config = {},
}: MultiEventProps): JSX.Element {
  const defaultConfig: MultiEventConfig = {
    weekends: [6, 7],
  };
  const [now, setNow] = useState(
    DateTime.now()
      .reconfigure({ outputCalendar: calendar })
  );

  const [meCalendar, setMeCalendar] = useState(calendar)
  useEffect(() => {
    console.log("calendar Changed")
    setMeCalendar(calendar);
    setMeEvents(EventFactory.setEventsTimeCalendar(EventFactory.sort(events),calendar))
    setNow(
      DateTime.now().reconfigure({ outputCalendar: calendar })
    );
  }, [calendar]);  

  // const [meEvents, setMeEvents] = useState(EventFactory.setEventsTimeCalendar(EventFactory.sort(events),calendar))
  const [meEvents, setMeEvents] = useState(EventFactory.setEventsTimeCalendar(EventFactory.sort(events),calendar))
  useEffect(() => {
    console.log("events Changed")
    setMeEvents(EventFactory.setEventsTimeCalendar(EventFactory.sort(events),meCalendar));
  }, [events]);  

  const [meConfig, setMeConfig] = useState({ ...defaultConfig, ...config });
  useEffect(() => {
    console.log("config Changed")
    setMeConfig({ ...defaultConfig, ...config });
  }, [config]);  


  // Merge the provided config with the default config

  
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<YearBarProps>(child) && child.type === YearBar) {
      return React.cloneElement<YearBarProps>(child, { now });
    }
    if (React.isValidElement<CalendarProps>(child) && child.type === Calendar) {
      return React.cloneElement<CalendarProps>(child, {
        events: meEvents,
        now,
        config: meConfig,
      });
    }
    return child;
  });
  return (
    <div className="multi-event">
      <div className="multi-event-content">{modifiedChildren}</div>
    </div>
  );
}

export default MultiEvent;
