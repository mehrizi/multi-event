import React from 'react';
import { YearBarProps } from '../../types';

function YearBar({ now }: YearBarProps): JSX.Element {
  return (
    <div>
      <p>Event Date: {now?.toISO()}</p>
    </div>
  );
}

export default YearBar;
