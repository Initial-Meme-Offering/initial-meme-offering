import React from 'react'

const renderBuyButton = field => {
    return (
  <div className="input-row">
    <input
      {...field.input}
      value="Buy"
      className="button is-success"
      type="submit"
    />
  </div>
)
}

export default renderBuyButton
