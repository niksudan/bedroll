import * as React from 'react';
import * as moment from 'moment';

const Checkbox = ({ completed }) => (
  <span className="icon is-medium">
    <i className={`fa fa-${completed ? 'check-square' : 'square-o'}`} style={{color: completed ? '#3cb371' : 'rgba(0,0,0,0.25)'}} />
  </span>
);

export default Checkbox;
