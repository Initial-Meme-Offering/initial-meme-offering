import React from 'react'

const renderSellButton = field => (
  <div className="input-row">
    <input
      {...field.input}
      name="offerType"
      value="Sell"
      className="button is-danger"
      type="submit"
    />
  </div>
)

export default renderSellButton
