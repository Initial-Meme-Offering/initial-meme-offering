import React from 'react'
import {connect} from 'react-redux'

class SingleMemeOrder extends React.Component {
  handleClick = () => {

  }

  render() {
    const {orderType, meme, order} = this.props
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
            <button className="button is-link" onClick={this.handleClick}>{orderType === 'buy' ? 'Buy' : 'Sell'}</button>
          </div> 
        </div>
      </div>
    )
  }
}

const mapState = (state, {match}) => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(SingleMemeOrder)
