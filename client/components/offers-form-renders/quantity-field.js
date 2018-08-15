import React from 'react'

const renderQuantityField = field => {
return (
  <div className="field">
  <div className="control">
    <label htmlFor="title" className="label">
      Quantity
    </label>
    <input className="field input" {...field.input} placeholder={field.placeholder} type="text" />
  </div>
</div>
)
}

export default renderQuantityField
