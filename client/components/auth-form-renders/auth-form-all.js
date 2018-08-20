import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {withRouter} from 'react-router-dom'
import renderEmailField from './email-field'
import renderPasswordField from './password-field'
import renderLoginButton from './login-button';

let AuthFormAll = props => {
    const {handleSubmit, name, displayName, error} = props
    return (
      <form onSubmit={handleSubmit} name={name}>
        <Field name="email" component={renderEmailField} />
        <Field name="password" component={renderPasswordField} />
        <Field name="button" error={error} component={renderLoginButton}/>
      </form>
    )
}

AuthFormAll = withRouter(AuthFormAll)
export default reduxForm({form: 'AuthForm'})(AuthFormAll)
