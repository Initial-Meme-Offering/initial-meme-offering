import React from 'react'

const renderOrderSelect = ({input, value}) => {
  return (
    <div className="field">
    <label className="label"/>
      <div className="select">
        <select {...input} defaultValue="">
          <option value="" hidden>Order Type</option>
          <option value="buy">
            Buy
          </option>
          <option value="sell" disabled={value === 'both' ? false : true}>
            Sell
          </option>
        </select>
      </div>
    </div>
  )
}

export default renderOrderSelect
