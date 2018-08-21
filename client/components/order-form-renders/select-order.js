import React from 'react'

const renderOrderSelect = ({input, value}) => {
  return (
    <div className="control">
    <label className="label">Order Type</label>
      <div className="select">
        <select {...input} defaultValue="">
          <option value="" hidden>Select One...</option>
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
