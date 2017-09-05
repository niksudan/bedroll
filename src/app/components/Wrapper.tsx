import * as React from 'react';
import { connect } from 'react-redux';
import Welcome from './Welcome';
import Error from './Error';

const Wrapper = ({ isLoading, didInvalidate, auth }) => {
  if (isLoading || auth.identity === undefined) {
    return null;
  }
  if (didInvalidate) {
    return <Error />;
  }
  return <Welcome />;
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  didInvalidate: state.app.didInvalidate,
  auth: state.app.auth,
});

export default connect(mapStateToProps)(Wrapper);
