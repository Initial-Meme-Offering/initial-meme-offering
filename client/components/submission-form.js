import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let SubmissionForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <form>
      <Field
        className="field input"
        name="quantity"
        component={renderField}
        type="text"
      />
      <Field
        className="field input"
        name="quantity"
        component={renderField}
        type="text"
      />
      <Field
        className="field input"
        name="quantity"
        component={renderField}
        type="text"
      />
    </form>
  )
}

const mapState = state => {
  initialValues: {
  }
}

SubmissionForm = reduxForm({form: 'submissionForm'})(SubmissionForm)
SubmissionForm = connect(mapState)(SubmissionForm)

export default SubmissionForm
