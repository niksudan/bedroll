import * as React from 'react';
import * as moment from 'moment';
import Icon from './Icon';

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
          return `${Math.abs(dueDays)} days ago`;
        }
        return `in ${dueDays} days`;
    }
  };
  return (
    <small>
      <Icon icon="clock-o" size="small" />
      <span>Due {getDueDate()}</span>
    </small>
  );
};

export default DueDate;
