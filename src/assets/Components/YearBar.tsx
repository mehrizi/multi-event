import React from 'react';
import { YearBarProps } from '../../types';
import { DateHelper } from '../Helpers/DateHelper';

function YearBar({ now ,setNow}: YearBarProps): JSX.Element {
  const prevMonth=()=>{
    const previousMonthLastDay = DateHelper.monthStart(now).plus({days:-1});
    setNow(previousMonthLastDay)
  }
  const nextMonth=()=>{
    const nextMonthFirstDay = DateHelper.monthEnd(now).plus({days:1});
    setNow(nextMonthFirstDay)
  }

  return (
    <div className='me-yearbar'>
      <button className='me-prev-button' onClick={prevMonth}>{"<"}</button>
      <span>{now?.toFormat("MMM")}</span>
      <button className='me-next-button' onClick={nextMonth}>{">"}</button>
    </div>
  );
}

export default YearBar;
