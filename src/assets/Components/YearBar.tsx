import { DateTime } from "luxon";
import { YearBarProps } from "../../types";
import { DateHelper } from "../Helpers/DateHelper";

export const YearBar = (props: YearBarProps): JSX.Element => {
  const setNow =
    props.setNow ??
    function (a:DateTime) {
      return a;
    };
  const now = props.now ?? DateTime.now();
  const prevMonth = () => {
    const previousMonthLastDay = DateHelper.monthStart(now).plus({ days: -1 });
    setNow(previousMonthLastDay);
  };
  const nextMonth = () => {
    const nextMonthFirstDay = DateHelper.monthEnd(now).plus({ days: 1 });
    setNow(nextMonthFirstDay);
  };

  return (
    <div className="me-yearbar">
      <button className="me-prev-button" onClick={prevMonth}>
        {"<"}
      </button>
      <span>{now?.toFormat("MMMM yyyy")}</span>
      <button className="me-next-button" onClick={nextMonth}>
        {">"}
      </button>
    </div>
  );
};

export default YearBar;
