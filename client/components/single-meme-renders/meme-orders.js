import React from 'react'

const SingleMemeOrder = props => {
  const {orderType, meme} = props
  return (
    <div className="box no-pad">
      <div className="level">
        <img className="image is-64x64" src={meme.img} />
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{meme.symbol || 'SYM'}</p>
            <p className="title">{meme.name}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Quantity</p>
            <p className="title">{'20'}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              {orderType == 'sell' ? 'Sell Order' : 'Buy Order'}
            </p>
            <p className="title">{`$30`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleMemeOrder
