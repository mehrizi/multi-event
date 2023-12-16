import { DateTime } from "luxon";
import { DateHelper } from "../Helpers/DateHelper";

describe("Date Helper", () => {
  test("monthStart", () => {
    const monthStart = DateHelper.monthStart(DateTime.now())
    const M1 = parseInt(monthStart.toFormat("M"));
    const previousDayOfMonthStart = monthStart.plus({ days: -1 });
    const M2 = parseInt(previousDayOfMonthStart.toFormat("M"))

    if (M1 == 1) {
      expect(M2).toBe(12);
    }
    else
      expect(M2).toBe(M1 - 1);
  })

  test("monthEnd", () => {
    const monthEnd = DateHelper.monthEnd(DateTime.now())
    const M1 = parseInt(monthEnd.toFormat("M"));
    const nextDayofMonthEnd = monthEnd.plus({ days: 1 });
    const M2 = parseInt(nextDayofMonthEnd.toFormat("M"))

    if (M1 == 12) {
      expect(M2).toBe(1);
    }
    else
      expect(M2).toBe(M1 + 1); 
  })

  test("weekStart less than equal now", () => {
    const ws = 3;
    const weekStart = DateHelper.weekStart(DateTime.now(),ws)
    expect(weekStart.toMillis()).toBeLessThanOrEqual(DateTime.now().toMillis())
  })
  test("weekStart day check", () => {
    const ws = 3;
    const weekStart = DateHelper.weekStart(DateTime.now(),ws)
    expect(parseInt(weekStart.toFormat("c"))).toBe(ws)
  })

  test("weekEnd greater than equal now", () => {
    const ws = 3;
    const weekEnd = DateHelper.weekEnd(DateTime.now(),ws)
    expect(weekEnd.toMillis()).toBeGreaterThanOrEqual(DateTime.now().toMillis())
  })

  test("weekEnd day check", () => {
    const ws = 3;
    const weekEnd = DateHelper.weekEnd(DateTime.now(),ws)
    const weekendNextDay = weekEnd.plus({days:1});
    expect(parseInt(weekendNextDay.toFormat("c"))).toBe(ws)
  })


});