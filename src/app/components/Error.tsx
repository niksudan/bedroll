import * as React from 'react';
import { connect } from 'react-redux';

const Error = ({ error }) => (
  <section className="hero is-fullheight is-danger">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">Oh No!</h1>
        <h3 className="subtitle">{error}</h3>
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({
  error: state.app.error,
});

export default connect(mapStateToProps)(Error);
