import React from 'react'

const renderSubmitButton = field => (
  <div className="field">
    <div className="control">
      <button
        {...field.input}
        name="orderSubmit"
        className="button is-link"
        type="submit"
      >
        Create Order
      </button>
    </div>
  </div>
)

export default renderSubmitButton
