import React, { ReactNode } from "react";
import YearBar from "./YearBar";
import Calendar from "./Calendar";
import { DateTime } from "luxon";

import {
  YearBarProps,
  CalendarProps,
  CalendarType,
  MultiEventConfig,
} from "../../types";
function MultiEvent({
  children,
  events,
  config = {},
}: MultiEventProps): JSX.Element {
  const defaultConfig: MultiEventConfig = {
    calendar: CalendarType.ISO8601, // Default calendar type
    weekends: [6,7]
  };
  const mergedConfig: MultiEventConfig = { ...defaultConfig, ...config };

  const now: DateTime = DateTime.now().set({ day: 1 });
  // Merge the provided config with the default config

  now.reconfigure({ outputCalendar: mergedConfig.calendar });
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<YearBarProps>(child) && child.type === YearBar) {
      return React.cloneElement<YearBarProps>(child, { now });
    }
    if (React.isValidElement<CalendarProps>(child) && child.type === Calendar) {
      return React.cloneElement<CalendarProps>(child, { events, now,config:mergedConfig });
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
