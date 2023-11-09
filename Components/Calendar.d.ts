import { DateTime } from "luxon";
import { MultiEventConfig, Event } from "./MultiEvent";
export interface CalendarProps {
    events?: Event[];
    now?: DateTime;
    config?: MultiEventConfig;
    today?: DateTime;
    weekStart?: number;
}
export declare const Calendar: (props: CalendarProps) => JSX.Element;
export default Calendar;
