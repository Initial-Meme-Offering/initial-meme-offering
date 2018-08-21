import React from 'react'

const renderQuantityField = ({input, placeholder, meta: {touched, error}}) => {
  return (
    <div className="control">
      <label className="label">Quantity</label>
      <input
        className="input"
        {...input}
        placeholder={placeholder}
        type="text"
      />
      {(touched &&
        (error && <span className="help is-danger">{error}</span>)) || <span />}
    </div>
  )
}

export default renderQuantityField
