import { DateTime } from "luxon";
export interface YearBarProps {
    now?: DateTime;
    setNow?: Function;
}
export declare const YearBar: (props: YearBarProps) => JSX.Element;
export default YearBar;
