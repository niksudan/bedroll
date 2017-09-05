import * as React from 'react';
import { connect } from 'react-redux';

const Welcome = ({ auth, account }) => (
  <div className="hero is-fullheight is-success">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">Welcome, {auth.identity.first_name}!</h1>
        <h3 className="subtitle">You are now logged in to <strong>{account.name}</strong></h3>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.app.auth,
  account: state.app.account,
});

export default connect(mapStateToProps)(Welcome);
