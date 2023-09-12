import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { logout } from './../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from 'components/spinner';

/**
 * Navbar
 *
 * @param {Function}   logout
 * @param {Boolean}    isAuthenticated
 * @param {Boolean}    loading
 */
const Navbar = ({ logout, isAuthenticated, loading }) => {
  const guestNav = (
    <>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </>
  );

  const authNav = (
    <>
      <li><Link to="/tasks">Tasks</Link></li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  if (loading)
    return <Spinner />

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fa fa-tasks"></i> Task Manager</Link>
      </h1>
      <ul>{ isAuthenticated ? authNav : guestNav }</ul>
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, { logout })(Navbar);