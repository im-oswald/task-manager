import React, { useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { login } from 'actions/auth';

/**
 * Login
 *
 * @param {Function}   login
 * @param {Boolean}    isAuthenticated
 */
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login(formData);
  }

  if(isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => onChange(e)} name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">Don't have an account? <Link to="/register">Register</Link></p>
    </section>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
