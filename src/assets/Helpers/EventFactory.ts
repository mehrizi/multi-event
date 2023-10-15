import { Event } from "../../types";
import DateTime from "luxon";

export class EventFactory {
    // Define the default options
    private defaultOptions = {
      titles: ['Meeting', 'Presentation', 'Lunch', 'Workshop', 'Conference'],
      colors: ['red', 'blue', 'green', 'yellow', 'orange'],
    };
  
    constructor(private day: DateTime) {}
  
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
  }