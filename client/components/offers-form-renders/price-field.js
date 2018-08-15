import React from 'react'

const renderPriceField = field => {
return (
  <div className="field">
  <div className="control">
    <label htmlFor="title" className="label">
      Price ($)
    </label>
    <input className="field input" {...field.input} placeholder={field.placeholder} type="text" />
  </div>
</div>
)
}

export default renderPriceField