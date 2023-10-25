import DateTime from "luxon";

export class DateHelper {
  // Define the default options
  // Generate a random event with Luxon DateTime
  static monthStart(time: DateTime): DateTime {
    const dayInMonth = time.toFormat("d");
    const start = time.plus({ days: -1 * dayInMonth + 1 });
    return start;
  }
  static monthEnd(time: DateTime): DateTime {
    let start = DateHelper.monthStart(time);
    const month = time.toFormat("M");
    let end: DateTime = null
    while (!end) {
      start = start.plus({ days: 1 });
      if (start.toFormat("M") != month)
        end = start.plus({ days: -1 });
    }
    return end
  }

  static weekStart(time: DateTime): DateTime {
    const weekday = time.toFormat("c");
    const toDecrease = weekday - 1;
    console.log(time,weekday);
    return time.plus({days:-1*toDecrease});
  }
  static weekEnd(time: DateTime): DateTime {
    const weekday = time.toFormat("c");
    const toIncrease = 7 - weekday ;
    return time.plus({days:toIncrease});

  }

}