import React from 'react'

const renderPriceField = ({input, meta: {touched, error}}) => {
  return (
    <div className="control">
      <label className="label">Price ($)</label>
      <input className="input" {...input} type="text" />
      {(touched &&
        (error && <span className="help is-danger">{error}</span>)) || <span />}
    </div>
  )
}

export default renderPriceField
