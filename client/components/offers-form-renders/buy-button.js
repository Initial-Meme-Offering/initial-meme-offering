import React from 'react'

const renderBuyButton = field => {
    return (
  <div className="input-row">
    <button
      {...field.input}
      name="offerType"
      value="Buy"
      className="button is-success"
      type="submit"
    />
  </div>
)
}

export default renderBuyButton
