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
}

export enum CalendarType {
    Buddhist = 'buddhist',
    Chinese = 'chinese',
    Coptic = 'coptic',
    EthiopicAmharic = 'ethiopiac',
    Ethiopic = 'ethiopic',
    Hebrew = 'hebrew',
    Indian = 'indian',
    Islamic = 'islamic',
    IslamicCivil = 'islamicc',
    ISO8601 = 'iso8601',
    Japanese = 'japanese',
    Persian = 'persian',
    ROC = 'roc',
  }
export interface MultiEventConfig {
    calendar?: CalendarType
    weekends: number[]
    
}
