import React from 'react'

const renderQuantityField = ({
  input,
  label,
  type,
  placeholder,
  meta: {touched, error}
}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor="title" className="label">
          Quantity
        </label>
        {(touched && (error && <p className="help is-danger">{error}</p>)) || (
          <p />
        )}
        <input
          className="input"
          {...input}
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  )
}

export default renderQuantityField
