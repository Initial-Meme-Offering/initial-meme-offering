import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="meme-font">
      <h1 className="title is-3">{displayName}</h1>
      <div className="box">
        <form onSubmit={handleSubmit} name={name}>
          <div className="field">
            <label htmlFor="email" className="label has-text-left meme-font">
              Email
            </label>
            <input name="email" type="email" className="input meme-font" />
          </div>
          <div className="field">
            <label htmlFor="password" className="label has-text-left meme-font">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="input meme-font"
            />
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-block is-link is-large is-fullwidth meme-font"
            >
              {displayName}
            </button>
            {error &&
              error.response && (
                <p className="help is-danger has-text-left">
                  {error.response.data}
                </p>
              )}
          </div>
        </form>
      </div>
      <p className="has-text-grey">
        <a href="/auth/google">{displayName} with Google</a>
      </p>
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

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
