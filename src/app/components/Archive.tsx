import * as React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import Icon from './Icon';

const Archive = ({ isFetchingTodos, account, items, total, refresh }) => (
  <section className="box" style={{ background: 'none', boxShadow: 'none' }}>
    <span className="is-pulled-right" onClick={() => { refresh(); }}>
      <Icon icon="refresh" size="small" className={isFetchingTodos ? 'spin' : ''} />
    </span>
    <p className="heading" style={{ marginBottom: '1rem' }}>
      Bedroll ({account.name})
    </p>
    {items.map(item => (
      <Item key={item.id} item={item} />
    ))}
  </section>
);

const mapStateToProps = state => ({
  isFetchingTodos: state.app.isFetchingTodos,
  account: state.app.account,
  items: state.app.items,
  total: state.app.total,
  refresh: state.app.refresh,
});

export default connect(mapStateToProps)(Archive);
