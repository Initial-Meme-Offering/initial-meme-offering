import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleLogout, isLoggedIn}) => (
  <nav id="navbar" className="navbar">
    <div className="container">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="field is-grouped">
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/"
                  className="is-link is-size-5 has-text-weight-semibold"
                >
                  Home
                </Link>
              </p>
            </div>
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/allmemes"
                  className="is-link is-size-5 has-text-weight-semibold"
                >
                  All Memes
                </Link>
              </p>
            </div>
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/trendingmemes"
                  className="is-link is-size-5 has-text-weight-semibold"
                >
                  Trending
                </Link>
              </p>
            </div>
            <div id="nav-button" className="navbar-item">
              <p className="control">
                <Link
                  to="/indices"
                  className="is-link is-size-5 has-text-weight-semibold"
                >
                  Indices
                </Link>
              </p>
            </div>
            {isLoggedIn && (
              <div id="nav-button" className="navbar-item is-hoverable">
                <p className="control">
                  <Link
                    className="button navbar-link is-info is-outlined is-medium has-text-weight-semibold"
                    to="/account"
                  >
                    Account
                  </Link>
                </p>
                <div className="navbar-dropdown">
                  <Link to="/portfolio/buy" className="navbar-item">
                    Portfolio
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
