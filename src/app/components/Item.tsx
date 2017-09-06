import * as React from 'react';
import * as moment from 'moment';
import DueDate from './DueDate';

const Item = ({ item }) => (
  <div className="is-flex">
    <div>
      <span className="icon is-medium">
        <i className={`fa fa-${item.completed ? 'check-square' : 'square-o'}`} style={{color: '#3cb371'}} />
      </span>
    </div>
    <div style={{paddingBottom: '1rem', paddingLeft: '0.5rem'}}>
      <div className="content">
        <p>
          <small>{moment(item.created_at).calendar()}</small>
          <br />
          <strong>{item.content}</strong>
          {item.due_on !== null &&
            <span>
              <br />
              <DueDate date={item.due_on} />
            </span>
          }
        </p>
      </div>
    </div>
  </div>
);

export default Item;
