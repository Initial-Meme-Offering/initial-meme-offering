import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

class SubmissionForm extends React.Component {
  render() {
    return (
      <form>
        <Field
          className="field input"
          name="quantity"
          component={renderQuantityField}
          type="text"
        />
        <Field
          className="field input"
          name="quantity"
          component={renderQuantityField}
          type="text"
        />
        <Field
          className="field input"
          name="quantity"
          component={renderQuantityField}
          type="text"
        />
      </form>
    )
  }
}
