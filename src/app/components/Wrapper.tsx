import * as React from 'react';
import { connect } from 'react-redux';
import Archive from './Archive';
import Error from './Error';
import Loading from './Loading';

const Wrapper = ({ didInvalidate, isFetchingToken, isAuthenticating, auth }) => {
  if (didInvalidate) {
    return <Error />;
  }
  if (isFetchingToken || isAuthenticating) {
    return <Loading />;
  }
  return <Archive />;
}

const mapStateToProps = state => ({
  didInvalidate: state.app.didInvalidate,
  isFetchingToken: state.app.isFetchingToken,
  isAuthenticating: state.app.isAuthenticating,
  auth: state.app.auth,
});

export default connect(mapStateToProps)(Wrapper);
