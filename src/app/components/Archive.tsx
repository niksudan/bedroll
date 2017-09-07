import * as React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import Icon from './Icon';

const Archive = ({ isFetchingTodos, account, items, total }) => {
  let content = items.map(item => (
    <Item key={item.id} item={item} />
  ));
  if (isFetchingTodos) {
    content = (
      <div className="has-text-centered">
        <Icon icon="refresh" className="spin" />
      </div>
    );
  }
  return (
    <section className="box" style={{ background: 'none', boxShadow: 'none' }}>
      <p className="heading" style={{ marginBottom: '1rem' }}>
        Bedroll ({account.name})
      </p>
      {content}
    </section>
  );
}

const mapStateToProps = state => ({
  isFetchingTodos: state.app.isFetchingTodos,
  account: state.app.account,
  items: state.app.items,
  total: state.app.total,
});

export default connect(mapStateToProps)(Archive);
