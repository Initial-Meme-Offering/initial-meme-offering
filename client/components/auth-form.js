import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="login-form" className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui image header">
          <div className="content">Log-in to your account</div>
        </h2>
        <form onSubmit={handleSubmit} name={name} className="ui large form ">
          <div className="ui stacked secondary segment column">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input name="email" type="text" placeholder="E-mail address" />
              </div>
            </div>
            <br />
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input name="password" type="password" placeholder="Password" />
              </div>
            </div>
            <br />
            <div>
              <button
                type="submit"
                className="ui fluid large teal submit button"
              >
                {displayName}
              </button>
            </div>
            <div>
              <a href="/auth/google">
                <button type="button" className="ui fluid large red button">
                  {displayName} with Google
                </button>
              </a>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
