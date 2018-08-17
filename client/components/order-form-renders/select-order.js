import React from 'react'

const renderOrderSelect = ({
  input,
  label,
  type,
  value,
  meta: {touched, error}
}) => {
  return (
    <div className="field">
      <label htmlFor="title" className="label">
        Order Type
      </label>
      <div className="select">
        <select>
          <option value="buy">Buy</option>
          <option value="sell" disabled={value === 'both' ? false : true}>
            Sell
          </option>
        </select>
      </div>
    </div>
  )
}

export default renderOrderSelect
