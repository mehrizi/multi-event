import { DateTime } from "luxon";
import { ReactNode } from "react";

export interface CalendarProps {
    events?: Event[];
    now?: DateTime
    config?: MultiEventConfig

}

export interface Event {
    time: DateTime;
    title: string;
    color: string;
}

export interface YearBarProps {
    now?: DateTime;
}

export interface MultiEventProps {
    children: ReactNode;
    events: Event[];
    config?: MultiEventConfig;
    calendar?: 'buddhist'
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
    | 'roc'
}

export interface MultiEventConfig {
    calendar?: 'buddhist'
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
    | 'roc'
    weekends: number[]

}
