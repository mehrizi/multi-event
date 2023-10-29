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
    let start = time.plus({days:0});
    const month = time.toFormat("M");
    let end: DateTime = null
    while (!end) {
      start = start.plus({ days: 1 });
      if (start.toFormat("M") != month)
        end = start.plus({ days: -1 });
    }
    return end
  }

  static weekStart(time: DateTime, weekStart:number): DateTime {
    let nowTime = time.plus({days:0});
    while(nowTime.toFormat("c")*1 != weekStart)
    {
      nowTime = nowTime.plus({days:-1});
    }
    return nowTime;
  }
  static weekEnd(time: DateTime, weekStart:number): DateTime {
    const weekEndDay = weekStart==1?7:weekStart-1;
    let nowTime = time.plus({days:0});
    while(nowTime.toFormat("c")*1 != weekEndDay)
    {
      nowTime = nowTime.plus({days:1});
    }
    return nowTime;

  }

}