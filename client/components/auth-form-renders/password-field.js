import React from 'react'

const renderPasswordField = ({input, meta: {touched, error}}) => {
  return (
    <div className="field">
      <label htmlFor="password" className="label has-text-left meme-font">
        Password
      </label>
      <input name="password" type="password" className="input meme-font" />
    </div>
  )
}

export default renderPasswordField
