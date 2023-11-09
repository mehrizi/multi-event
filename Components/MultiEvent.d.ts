import { ReactNode } from "react";
import { DateTime } from "luxon";
export interface Event {
    time: DateTime;
    title: string;
    color: string;
}
export declare const DefaultConfig: MultiEventConfig;
export type calendarType = 'buddhist' | 'chinese' | 'coptic' | 'ethiopiac' | 'ethiopic' | 'hebrew' | 'indian' | 'islamic' | 'islamicc' | 'iso8601' | 'japanese' | 'persian' | 'roc';
export interface MultiEventProps {
    children: ReactNode;
    events: Event[];
    config?: MultiEventConfig;
    calendar?: calendarType;
    today?: DateTime;
}
export interface MultiEventConfig {
    weekends: number[];
    rtl: boolean;
    weekstart: number;
}
export declare const MultiEvent: ({ children, events, calendar, config, today, }: MultiEventProps) => JSX.Element;
export default MultiEvent;
