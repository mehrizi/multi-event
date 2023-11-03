import { Event } from "../Components/MultiEvent";
import {DateTime} from "luxon";

export class EventFactory {
  // Define the default options
  private defaultOptions = {
    titles: ['Meeting', 'Presentation', 'Lunch', 'Workshop', 'Conference'],
    colors: ['#009688', '#00bcd4', '#03a9f4', '#d4e157', '#8bc34a', '#ffe082', '#ff9800'],
  };

  constructor(private day: DateTime) { }

  // Generate a random event with Luxon DateTime
  generateRandomEvent(): Event {
    const { titles, colors } = this.defaultOptions;

    const randomTime = this.day
      .set({ hour: Math.floor(Math.random() * 24), minute: Math.floor(Math.random() * 60) });

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return {
      time: randomTime,
      title: randomTitle,
      color: randomColor,
    };
  }

  // Generate an array of random events with Luxon DateTime for the specified day
  generateRandomEventArray(eventCount: number): Event[] {
    const events: Event[] = [];

    for (let i = 0; i < eventCount; i++) {
      events.push(this.generateRandomEvent());
    }

    return events;
  }

  static setEventsTimeCalendar(events: Event[], calendar: string) {
    return events.map(e => {
      e.time = e.time.reconfigure({ outputCalendar: calendar });
      return e;
    })
  }

  static sort(events: Event[]): Event[] {
    return events.sort((a, b) => {
      return a.time.toMillis() == b.time.toMillis()
        ? 0
        : a.time.toMillis() > b.time.toMillis()
          ? 1
          : -1;
    })
  }
}