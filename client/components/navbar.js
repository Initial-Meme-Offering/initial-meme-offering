import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({id, handleLogout, isLoggedIn, isAdmin}) => (
  <nav id="navbar" className="navbar is-fixed-top">
    <div className="container">
      <div className="navbar-brand">
        <div className="navbar-item">
          <p className="control">
            <Link to="/" className="has-text-weight-bold">
              Memenomics
            </Link>
          </p>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          {isLoggedIn && (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to={`/account`}>
                Account
              </Link>
              <div className="navbar-dropdown">
                <Link to={`/portfolio/buy`} className="navbar-item">
                  Portfolio
                </Link>
                <Link to={`/offers`} className="navbar-item">
                  Offers
                </Link>
                <Link to={`/manage`} className="navbar-item">
                  Manage Account
                </Link>

                {/* {isAdmin && (
              <div>
                <hr className="navbar-divider" />
                <NavLink
                  to="/manage"
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  Manage
                </NavLink>
              </div>
            )} */}

                <hr className="navbar-divider" />
                <a href="#" onClick={handleLogout} className="navbar-item">
                  Logout
                </a>
              </div>{' '}
            </div>
          )}
          {!isLoggedIn && (
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link to="/login" className="button is-link is-success">
                    Login
                  </Link>
                </p>
                <p className="control">
                  <Link to="/signup" className="button is-link is-success">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
)
// /**
//  * CONTAINER
//  */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
    // isAdmin: !!state.me.isAdmin,
    //id: state.me.id
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
  // isAdmin: PropTypes.bool.isRequired
}
