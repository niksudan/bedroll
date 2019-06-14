import * as React from 'react';
import * as moment from 'moment';
import Icon from './Icon';

const Completion = ({ completion }) => (
  <small>
    <Icon icon="check-circle-o" size="small" />
    <span>
      Completed {moment(completion.created_at).fromNow()} by{' '}
      {completion.creator.name}
    </span>
  </small>
);

export default Completion;
