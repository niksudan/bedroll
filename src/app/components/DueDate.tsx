import * as React from 'react';
import * as moment from 'moment';

const DueDate = ({ date }) => {
  const isDue = !moment(date).isAfter(moment(), 'day');

  const getDueDate = () => {
    const dueDays = moment(date).diff(moment().startOf('day'), 'day');
    switch (dueDays) {
      case 0:
        return 'today';
      case 1:
        return 'tomorrow';
      case -1:
        return 'yesterday';
      default:
        if (dueDays < 0) {
          return `${Math.abs(dueDays)} ago`;
        }
        return `in ${dueDays} days`;
    }
  }
  
  return (
    <span className={`tag is-${isDue ? 'danger' : 'warning'}`}>
      Due {getDueDate()}
    </span>
  );
}

export default DueDate;
