import * as React from 'react';
import * as moment from 'moment';
import Icon from './Icon';

const Checkbox = ({ completed }) => (
  <Icon
    icon={completed ? 'check-square' : 'square-o'}
    size="medium"
    style={{color: completed ? '#3cb371' : 'rgba(0,0,0,0.25)'}}
  />
);

export default Checkbox;
