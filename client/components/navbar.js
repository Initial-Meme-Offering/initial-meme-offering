import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const toggleNav = event => {
  const navbarBurger = event.target
  const navbarMenu = document.getElementById('navPrimary')

  navbarBurger.classList.toggle('is-active')
  navbarMenu.classList.toggle('is-active')
}

const Navbar = ({id, handleLogout, isLoggedIn, isAdmin}) => (
  <nav className="navbar is-danger is-fixed-top level">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-text-weight-bold">
          Memenomics
        </Link>
      </div>

      <div
        className="navbar-burger burger"
        onClick={event => toggleNav(event)}
        data-target="navPrimary"
      >
        <span />
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="level-left">
            <div className="level-item">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="text" placeholder="Search" />
                </div>
                <div className="control">
                  <a className="button is-info">Search</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {isLoggedIn && (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/user">
                Account
              </Link>
              <div className="navbar-dropdown">
                <NavLink
                  to={`/user/#`}
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  Portfolio
                </NavLink>
                <Link to={`user/#`} className="navbar-item">
                  Offers
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
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup" className="navbar-item">
              Sign up
            </Link>
          )}
        </div>
      </div>
    </div>
  </nav>
)
/**
 * CONTAINER
 */
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
