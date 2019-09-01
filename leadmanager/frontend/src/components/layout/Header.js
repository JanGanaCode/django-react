import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.shape({}).isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  render() {
    const { auth } = this.props;
    const { isAuthenticated, user } = auth;
    const { logoutUser } = this.props;

    const authLinks = (
      <Fragment>
        <span className='navbar-text mr-4'>
          {user && `Hello ${user.username}`}
        </span>
        <li className='nav-item'>
          <button
            className='nav-link btn-info btn-sm text-light'
            onClick={() => logoutUser()}
          >
            Logout
          </button>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>
            Login
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarTogglerDemo01'
            aria-controls='navbarTogglerDemo01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
            <a className='navbar-brand' href='#'>
              Lead Manager
            </a>
            <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
