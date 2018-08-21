import React from 'react'
import {connect} from 'react-redux'
import {respondToOffer} from '../../store'
import history from '../../history'

class SingleMemeOrder extends React.Component {
  handleClick = () => {
    const {respondToOffer, user, order} = this.props
    if (user.id > 0) {
      respondToOffer(order.id, user.id)
    } else {
      history.push('/login')
    }
  }

  render() {
    const {orderType, order} = this.props
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
                Price Per Share ($)
              </p>
              <p className="title">{`$${order.price}`}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            {orderType === 'buy' ? (
              <button
                className="button is-link"
                onClick={this.handleClick}
                type="button"
              >
                Sell
              </button>
            ) : orderType === 'sell' ? (
              <button
                className="button is-link"
                onClick={this.handleClick}
                type="button"
              >
                Buy
              </button>
            ) : (
              ''
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
