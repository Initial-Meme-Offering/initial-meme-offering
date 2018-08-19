import React from 'react'
import {connect} from 'react-redux'
import {respondToOffer} from '../../store'

class SingleMemeOrder extends React.Component {
  handleClick = () => {
    const {respondToOffer, user, order} = this.props
    respondToOffer(order.id, user.id)
  }

  render() {
    const {orderType, order, memeId, memeStocks} = this.props
    return (
      <div className="box no-pad">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Quantity</p>
              <p className="title">{order.quantity}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                {orderType == 'sell' ? 'Sell Order' : 'Buy Order'}
              </p>
              <p className="title">{`$${order.price}`}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            {orderType === 'buy' &&
            memeStocks[memeId] &&
            memeStocks[memeId].quantity >= order.quantity ? (
              <button
                className="button is-link"
                onClick={this.handleClick}
                type="button"
              >
                Sell
              </button>
            ) : (orderType === 'sell' ?
              <button
                className="button is-link"
                onClick={this.handleClick}
                type="button"
              >
                Buy
              </button> : ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, {match}) => ({
  user: state.user,
  memeStocks: state.memeStocks.byId
})

const mapDispatch = dispatch => ({
  respondToOffer: (offerId, userId) => dispatch(respondToOffer(offerId, userId))
})

export default connect(mapState, mapDispatch)(SingleMemeOrder)
