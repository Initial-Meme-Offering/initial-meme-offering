import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button, Menu, Input} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <Menu>
          <Menu.Item>
            <Link to="/landingPage">
              <Button primary>Home</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <a href="#" onClick={handleClick}>
              <Button>Logout</Button>
            </a>
          </Menu.Item>
          <Menu.Item position="center">
            <h1>Meme Economy</h1>
          </Menu.Item>
          <Menu.Item position="right">
            <Input
              action={{type: 'submit', content: 'Go'}}
              placeholder="Navigate to..."
            />
          </Menu.Item>
        </Menu>
      </div>
    ) : (
      <div>
        <Menu>
          {/* The navbar will show these links before you log in */}
          <Menu.Item>
            <Link to="/login">
              <Button primary>Login</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </Menu.Item>
          <Menu.Item position="center">
            <h1>Meme Economy</h1>
          </Menu.Item>
          <Menu.Item position="right">
            <Input
              action={{type: 'submit', content: 'Go'}}
              placeholder="Navigate to..."
            />
          </Menu.Item>
        </Menu>
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

//Example NavBar with Bulma
{
  /* <nav className="navbar is-primary">
<div className="container">
  <div className="navbar-brand">
    <a className="navbar-item has-text-weight-bold" href="#">
      Meme Logo
    </a> */
}
{
  //this is an insert for mobile devices with hamburger
  /* <div className="navbar-burger burger" data-target="navMenu">
      <span />
      <span />
      <span />
    </div> */
}
//   </div>
//   <div className="navbar-menu" id="navMenu">
//     <div className="navbar-start">
//       <div className="navbar-item has-dropdown is-hoverable">
//         <a href="#" className="navbar-link is-active">
//           Browse
//         </a>
//         <div className="navbar-dropdown">
//           <a href="#" className="navbar-item">
//             Wow
//           </a>
//           <a href="#" className="navbar-item">
//             Dang
//           </a>
//           <a href="#" className="navbar-item">
//             Hot damn
//           </a>
//         </div>
//       </div>
//     </div>
//     <div className="navbar-end">
//       <a href="#" className="navbar-item">
//         Home
//       </a>
//       <a href="#" className="navbar-item">
//         Index
//       </a>
//       <a href="#" className="navbar-item">
//         Indices
//       </a>
//       <a href="#" className="navbar-item">
//         Submit New
//       </a>
//     </div>
//   </div>
// </div>
// </nav>
