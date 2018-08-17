import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const PortfolioList = props => {
  return (
    <div className="container">
      {!offers[0] || !offers[0].meme
        ? 'Loading...'
        : offers.map(offer => (
            <OfferObject key={offer.id} meme={offer.meme} offer={offer} />
          ))}
    </div>
  )
}
