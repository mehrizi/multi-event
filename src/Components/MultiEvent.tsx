import React, {  useEffect, useState,ReactNode } from "react";
import YearBar,{YearBarProps} from "./YearBar";
import {Calendar,CalendarProps} from "./Calendar";
import { DateTime } from "luxon";
import "./MultiEvent.scss";

import { EventFactory } from "../Helpers/EventFactory";

export interface Event {
  time: DateTime;
  title: string;
  color: string;
}

export const DefaultConfig: MultiEventConfig = {
  weekends: [6, 7],
  rtl: false,
  weekstart: 1,
};

export type calendarType = 'buddhist'
    | 'chinese'
    | 'coptic'
    | 'ethiopiac'
    | 'ethiopic'
    | 'hebrew'
    | 'indian'
    | 'islamic'
    | 'islamicc'
    | 'iso8601'
    | 'japanese'
    | 'persian'
    | 'roc';
export interface MultiEventProps {
    children: ReactNode;
    events: Event[];
    config?: MultiEventConfig;
    calendar?:calendarType
    today?:DateTime
}

export interface MultiEventConfig {
    weekends: number[]
    rtl: boolean
    weekstart: number
}

export const MultiEvent = ({
  children,
  events,
  calendar = "iso8601",
  config,
  today = DateTime.now(),
}: MultiEventProps): JSX.Element=> {
  
  const [now, setNow] = useState(
    DateTime.now().reconfigure({ outputCalendar: calendar })
  );

  const [meCalendar, setMeCalendar] = useState(calendar);
  useEffect(() => {
    console.log("calendar Changed");
    setMeCalendar(calendar);
    setMeEvents(
      EventFactory.setEventsTimeCalendar(EventFactory.sort(events), calendar)
    );
    setNow(DateTime.now().reconfigure({ outputCalendar: calendar }));
  }, [calendar]);

  // const [meEvents, setMeEvents] = useState(EventFactory.setEventsTimeCalendar(EventFactory.sort(events),calendar))
  const [meEvents, setMeEvents] = useState(
    EventFactory.setEventsTimeCalendar(EventFactory.sort(events), calendar)
  );
  useEffect(() => {
    console.log("events Changed");
    setMeEvents(
      EventFactory.setEventsTimeCalendar(EventFactory.sort(events), meCalendar)
    );
  }, [events]);

  const [meConfig, setMeConfig] = useState({ ...DefaultConfig, ...config });
  useEffect(() => {
    console.log("config Changed");
    setMeConfig({ ...DefaultConfig, ...config });
  }, [config]);

  today = today.reconfigure({ outputCalendar: meCalendar });
  // const [meToday, setMeToday] = useState(today.reconfigure({ outputCalendar: meCalendar }));
  // useEffect(() => {
  //   console.log("today Changed",today)
  //   setMeToday(today.reconfigure({ outputCalendar: meCalendar }));
  // }, [today]);

  // Merge the provided config with the default config

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<YearBarProps>(child) && child.type === YearBar) {
      return React.cloneElement<YearBarProps>(child, { setNow, now });
    }
    if (React.isValidElement<CalendarProps>(child) && child.type === Calendar) {
      return React.cloneElement<CalendarProps>(child, {
        events: meEvents,
        now,
        config: meConfig,
        today: today,
        weekStart: meConfig.weekstart,
      });
    }
    return child;
  });

  console.log(config, meConfig);
  return (
    <div className={"multi-event" + (meConfig.rtl ? " rtl" : "")}>
      <div className="multi-event-content">{modifiedChildren}</div>
    </div>
  );
}

export default MultiEvent;
