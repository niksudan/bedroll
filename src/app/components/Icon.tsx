import * as React from 'react';

const Icon = ({ icon, size = '', style = {}, className = '' }) => (
  <span className={`icon${size !== '' ? ` is-${size}` : ''}`}>
    <i className={`fa fa-${icon} ${className}`} style={style} />
  </span>
);

export default Icon;
