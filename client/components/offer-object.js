import React from 'react'

const OfferObject = props => {
  const {meme, offer} = props
  return (
    <div className="box no-pad">
      <div className="level">
        <img className="image is-64x64" src={meme.imageUrl} />
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{meme.symbol || 'DB'}</p>
            <p className="title">{meme.name}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Quantity</p>
            <p className="title">{offer.quantity}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              {offer.offerType == 'sell'
                ? 'Offer to Sell'
                : 'Offer to Purchase'}
            </p>
            <p className="title">{`$${offer.price}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferObject
