import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({id, handleLogout, isLoggedIn, isAdmin}) => (
  <nav id="navbar" className="navbar">
    <div className="container">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="field is-grouped">
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/"
                  className="button is-link is-info is-hoverable is-outlined"
                >
                  Home
                </Link>
              </p>
            </div>
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/allmemes"
                  className="button is-link is-info is-hoverable is-outlined"
                >
                  All Memes
                </Link>
              </p>
            </div>
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/trendingmemes"
                  className="button is-link is-info is-hoverable is-outlined"
                >
                  Trending
                </Link>
              </p>
            </div>
            {isLoggedIn && (
              <div id="nav-button" className="navbar-item is-hoverable">
                <p className="control">
                  <Link
                    className="button navbar-link is-info is-outlined"
                    to="/account"
                  >
                    Account
                  </Link>
                </p>
                <div className="navbar-dropdown">
                  <Link to="/portfolio/buy" className="navbar-item">
                    Portfolio
                  </Link>
                  <Link to="/manage" className="navbar-item">
                    Manage Account
                  </Link>
                  <hr className="navbar-divider" />
                  <a href="#" onClick={handleLogout} className="navbar-item">
                    Logout
                  </a>
                </div>{' '}
              </div>
            )}

            {!isLoggedIn && (
              <div id="nav-button" className="navbar-item">
                <p className="control">
                  <Link
                    to="/login"
                    className="button is-link is-info is-outlined"
                  >
                    Enter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
