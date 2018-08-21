import React from 'react'

const renderSubmitButton = field => (
  <div className="control">
    <label className="label">&nbsp;</label>
    <button
      {...field.input}
      name="orderSubmit"
      className="button is-link"
      type="submit"
    >
      Place Bid
    </button>
  </div>
)

export default renderSubmitButton
