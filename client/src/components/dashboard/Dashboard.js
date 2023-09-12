import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Dashboard
 *
 * @param {Object}     auth
 */
const Dashboard = ({ auth: { user, loading } }) => (
  <div className='container'>
    {
      loading ?
        <Spinner /> :
        <>
          <h1 className='text-primary large'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {user?.name}!
          </p>
        </>
      }
      <p>It seems you haven't interacted with the tasks page yet, click below to know more about it or to logout.</p>
      <Link to='/logout' className='btn btn-danger my-1'>
        Logout
      </Link>
  </div>
)

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Dashboard);
