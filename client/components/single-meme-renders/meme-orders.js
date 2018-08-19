import React from 'react'
import {connect} from 'react-redux'
import {respondToOffer} from '../../store'

class SingleMemeOrder extends React.Component {
  handleClick = () => {
    const {respondToOrder, user, order} = this.props
    respondToOrder(order.id, user.id)
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
                {orderType == 'sell' ? 'Sell Order' : 'Buy Order'}
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
                'Buy'
              </button>
            ) : (
              <span className="tag is-info">Sell</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, {match}) => ({user: state.user})

const mapDispatch = dispatch => ({
  respondToOrder: (offerId, userId) => dispatch(respondToOffer(offerId, userId))
})

export default connect(mapState, mapDispatch)(SingleMemeOrder)
