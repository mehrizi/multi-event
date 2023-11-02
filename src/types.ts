import { DateTime } from "luxon";
import { ReactNode } from "react";

export interface CalendarProps {
    events?: Event[];
    now?: DateTime
    config?: MultiEventConfig
    today?:DateTime
    weekStart?: number
}

export interface Event {
    time: DateTime;
    title: string;
    color: string;
}

export interface YearBarProps {
    now?: DateTime;
    setNow?: Function;
}
type calendarType = 'buddhist'
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
