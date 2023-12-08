# Multi Event Calendar

This is a simple React calendar component (with **monthly** view only) that is suitable to display multiple events per day.

For a live demo visit [mehrizi.github.io/multi-event](https://mehrizi.github.io/multi-event)

## key features:

+ Multi calendar system support ('buddhist'
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
    | 'roc')
+ RTL support
+ Weekends are configurable
+ Week start is configurable

## Installation
### Peer dependencies:
- React (I assume you already have react installed to use a React component!)
- Luxon which we use as date adapter: `npm i luxon --save`

### Install the package
To install the package via npm simply run the following in root of your project: <br/>
`npm i multi-event-calendar --save`


## How to use
After installaction you can simply use it like this:
```JSX
import { DateTime } from "luxon";
import {MultiEvent,Calendar,YearBar} from 'multi-event-calendar';
import 'multi-event-calendar/dist/style.css'  // Dont forget to include css

let events =[{
    time: DateTime.now(), // return a luxon object
    title: "Some event title", 
    color: "#cab" //some color hex
    // Your event might have other attributes but these 3 are must
 }]

<MultiEvent events={events}>
    <YearBar />
    <Calendar />
</MultiEvent>
```
## Configs
The `MultiEvent` Component follows  the following Interface:
```JSX
interface MultiEventProps {
    children: ReactNode;
    events: Event[];
    config?: MultiEventConfig;
    calendar?:calendarType
    today?:DateTime
}
```
### Calendar Types available:
```JSX
calendarType = 'buddhist'
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
```
### MultiEventConfig:
```JSX
interface MultiEventConfig {
    weekends: number[]
    rtl: boolean
    weekstart: number
}
```

## Tests
There are two series of tests
### Jest and react testing libraries
Unit tests: `npm run test`
### Story Book based tests
Integration tests are done by storybook testing features to run them first run `npm run storybook` and then after `npm run storybook:test`

