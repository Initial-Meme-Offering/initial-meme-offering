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
          {isLoggedIn && (
            // <div className="field is-grouped">
            //   <p className="control">
            //     <a href="/" className="button is-link">
            //       Home
            //     </a>
            //   </p>
            //   <p className="control">
            //     <a className="button">Cancel</a>
            //   </p>
            //   <p className="control">
            //     <a className="button is-danger">Delete post</a>
            //   </p>
            // </div>

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
            </div>
          )}
          {!isLoggedIn && (
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link to="/login" className="button is-link is-success">
                    Enter
                  </Link>
                </p>
                <p className="control">
                  <Link to="/" className="button is-link is-success">
                    Home
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
