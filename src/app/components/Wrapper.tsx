import * as React from 'react';
import { connect } from 'react-redux';
import Archive from './Archive';
import Error from './Error';
import Loading from './Loading';

const Wrapper = ({ isLoading, didInvalidate, auth }) => {
  if (isLoading || auth.identity === undefined) {
    return <Loading />;
  }
  if (didInvalidate) {
    return <Error />;
  }
  return <Archive />;
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  didInvalidate: state.app.didInvalidate,
  auth: state.app.auth,
});

export default connect(mapStateToProps)(Wrapper);
