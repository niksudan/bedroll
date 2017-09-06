import * as React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

const Archive = ({ account, items, total }) => (
  <section className="box" style={{ background: '#f5efe6' }}>
    <p className="heading" style={{ marginBottom: '1rem' }}>
      Basecamp Mini ({account.name})
    </p>
    {items.map(item => (
      <Item key={item.id} item={item} />
    ))}
  </section>
);

const mapStateToProps = state => ({
  account: state.app.account,
  items: state.app.items,
  total: state.app.total,
});

export default connect(mapStateToProps)(Archive);
