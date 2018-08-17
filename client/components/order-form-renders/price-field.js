import React from 'react'

const renderPriceField = ({input, meta: {touched, error}}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor="title" className="label">
          Price ($)
        </label>
        {(touched && (error && <p className="help is-danger">{error}</p>)) || (
          <p />
        )}
        <input
          className="input"
          {...input}
          type="text"
        />
      </div>
    </div>
  )
}

export default renderPriceField
