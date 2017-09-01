import * as React from 'react';
import { connect } from 'react-redux';

const Welcome = ({ auth, isLoading }) => {
  if (isLoading || auth.identity === undefined) {
    return null;
  }
  return (
    <div className="hero is-fullheight is-success">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Welcome, {auth.identity.first_name}!</h1>
          <h3 className="subtitle">You are now logged in</h3>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  auth: state.app.auth,
});

export default connect(mapStateToProps)(Welcome);
