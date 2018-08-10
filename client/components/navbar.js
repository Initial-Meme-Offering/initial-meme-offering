import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Button, Menu, Input } from 'semantic-ui-react'


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
            <Menu.Item position='center'>
              <h1>Meme Economy</h1>
            </Menu.Item>
            <Menu.Item position='right'>
              <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' />
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
          <Menu.Item position='center'>
            <h1>Meme Economy</h1>
          </Menu.Item>
          <Menu.Item position='right'>
            <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' />
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
