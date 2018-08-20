import React from 'react'

const renderEmailField = ({input, meta: {touched, error}}) => {
  return (
    <div className="field">
      <label htmlFor="email" className="label has-text-left meme-font">
        Email
      </label>
      <input name="email" type="email" className="input meme-font" />
    </div>
  )
}

export default renderEmailField
