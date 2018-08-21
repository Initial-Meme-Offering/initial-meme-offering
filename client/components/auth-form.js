import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {auth} from '../store'
import {AuthFormAll} from './auth-form-renders'

class AuthForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'login',
      displayName: 'Login'
    }
  }

  handleTabClick = (name, displayName) => {
    this.setState({name, displayName})
  }

  render() {
    const {name, displayName} = this.state
    return (
      <div className="section is-medium">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical" />
              <div className="tile is-parent">
                <article className="tile is-child is-info">
                  <div className="tabs">
                    <ul>
                      <li
                        className={name === 'login' ? 'is-active' : ''}
                        onClick={() => {
                          this.handleTabClick('login', 'Log In')
                        }}
                      >
                        <a>Log In</a>
                      </li>
                      <li
                        className={name === 'signup' ? 'is-active' : ''}
                        onClick={() => {
                          this.handleTabClick('signup', 'Sign Up')
                        }}
                      >
                        <a>Sign Up</a>
                      </li>
                    </ul>
                  </div>
                  <AuthFormAll {...this.props} {...this.state} />
                  <footer className="has-text-centered">
                    <p className="">
                      <a href="/auth/google">{displayName} with Google</a>
                    </p>
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
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

export default withRouter(connect(mapState, mapDispatch)(AuthForm))
