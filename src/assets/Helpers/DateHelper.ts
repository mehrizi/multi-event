import { DateTime } from "luxon";

export class DateHelper {
  // Define the default options
  // Generate a random event with Luxon DateTime
  static monthStart(time: DateTime): DateTime {
    const dayInMonth = parseInt(time.toFormat("d"));
    const start = time.plus({ days: -1 * dayInMonth + 1 });
    return start;
  }
  static monthEnd(time: DateTime): DateTime {
    let start = time.plus({ days: 0 });
    const month = time.toFormat("M");
    let end: DateTime = start.plus({days:0})
    let endFound:boolean = false;
    while (!endFound) {
      start = start.plus({ days: 1 });
      if (start.toFormat("M") != month)
      {
        end = start.plus({ days: -1 });
        endFound = true;
      } 

    }
    return end
  }

  static weekStart(time: DateTime, weekStart: number): DateTime {
    let nowTime = time.plus({ days: 0 });
    while (parseInt(nowTime.toFormat("c")) != weekStart) {
      nowTime = nowTime.plus({ days: -1 });
    }
    return nowTime;
  }
  static weekEnd(time: DateTime, weekStart: number): DateTime {
    const weekEndDay = weekStart == 1 ? 7 : weekStart - 1;
    let nowTime = time.plus({ days: 0 });
    while (parseInt(nowTime.toFormat("c")) != weekEndDay) {
      nowTime = nowTime.plus({ days: 1 });
    }
    return nowTime;

  }

}