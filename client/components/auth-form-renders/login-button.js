import React from 'react'

const renderLoginButton = ({input, error}) => {
  return (
    <div className="field">
      <button
        type="submit"
        {...input}
        className="button is-block is-link is-large is-fullwidth meme-font"
      >
        Login {/*eventually displayName*/}
      </button>
      {error &&
        error.response && (
          <p className="help is-danger has-text-left">{error.response.data}</p>
        )}
    </div>
  )
}

export default renderLoginButton
