import React from 'react'

const renderSubmitButton = field => (
  <div className="field">
    <button
      {...field.input}
      name="orderSubmit"
      className="button is-link"
      type="submit"
    >
      Create Order
    </button>
  </div>
)

export default renderSubmitButton
