import React from 'react'

const SingleMemeHeader = props => {
    const {name} = props
  return (
    <div className="columns">
      <div className="column">
        <h2 className="title is-3">{name}</h2>
      </div>
    </div>
  )
}
export default SingleMemeHeader
