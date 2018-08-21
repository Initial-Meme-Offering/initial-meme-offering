import React from 'react'

const renderOrderSelect = ({input, value}) => {
  return (
    <div className="select">
      <label className="label">Order Type</label>
      <select {...input} defaultValue="">
        <option value="" hidden>
          Select One...
        </option>
        <option value="buy">Buy</option>
        <option value="sell" disabled={value === 'both' ? false : true}>
          Sell
        </option>
      </select>
    </div>
  )
}

export default renderOrderSelect
