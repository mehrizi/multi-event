import React, { ReactNode, useEffect, useState } from "react";
import YearBar from "./YearBar";
import Calendar from "./Calendar";
import { DateTime } from "luxon";
import "./MultiEvent.scss";

import { YearBarProps, CalendarProps, MultiEventConfig } from "../../types";
function MultiEvent({
  children,
  events,
  calendar,
  config = {},
}: MultiEventProps): JSX.Element {
  const defaultConfig: MultiEventConfig = {
    calendar: "persian", // Default calendar type
    weekends: [6, 7],
  };
  const mergedConfig: MultiEventConfig = { ...defaultConfig, ...config };
  if (calendar) mergedConfig.calendar = calendar;

  useEffect(() => {
    setFinalConfig({ ...finalConfig, calendar: calendar });
    setNow(
      DateTime.now().reconfigure({ outputCalendar: calendar }).set({ day: 1 })
    );
  }, [calendar]);  

  const [finalConfig, setFinalConfig] = useState({ ...mergedConfig });

  const [now, setNow] = useState(
    DateTime.now()
      .reconfigure({ outputCalendar: mergedConfig.calendar })
      .set({ day: 1 })
  );

  // Merge the provided config with the default config

  const eventsOrdered = events.sort((a, b) => {
    return a.time.toMillis() == b.time.toMillis()
      ? 0
      : a.time.toMillis() > b.time.toMillis()
      ? 1
      : -1;
  });

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<YearBarProps>(child) && child.type === YearBar) {
      return React.cloneElement<YearBarProps>(child, { now });
    }
    if (React.isValidElement<CalendarProps>(child) && child.type === Calendar) {
      return React.cloneElement<CalendarProps>(child, {
        events: eventsOrdered,
        now,
        config: mergedConfig,
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
