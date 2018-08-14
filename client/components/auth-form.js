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
//   <div>
//     <div className='card'>
//     <form className='move-form-down'>
//       <div class="field">
//         <div class="sucess">
//           <input class="input is-primary" type="text" placeholder="Primary input"/>
//         </div>
//       </div>
//     </form>
//     </div>
//  </div>
<div className='move-form-down is-centered'>
  <div class="field column is-4">
    <p class="control has-icons-left has-icons-right">
      <input class="input" type="email" placeholder="Email"/>
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
      <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
    </span>
  </p>
</div>
  <div class="field column is-4">
    <p class="control has-icons-left">
      <input class="input" type="password" placeholder="Password"/>
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
    </p>
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
