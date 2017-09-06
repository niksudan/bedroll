import * as React from 'react';
import * as moment from 'moment';

const Completion = ({ completion }) => (
  <small>
    <span className="icon is-small">
      <i className="fa fa-check-circle-o" />
    </span>
    &nbsp;Completed {moment(completion.created_at).fromNow()} by {completion.creator.name}
  </small>
);

export default Completion;
