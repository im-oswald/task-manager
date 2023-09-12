import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spinner } from 'components/spinner';

/**
 * PrivateRoute
 *
 * @param {Node}       children
 * @param {Boolean}    isAuthenticated
 * @param {Boolean}    loading
 */
const PrivateRoute = ({ children, isAuthenticated, loading }) => {
  if (loading) {
    return <Spinner />
  }

  return isAuthenticated ? children : (<Navigate to='/login' />);
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
