import React from 'react'
import {connect} from 'react-redux'
import SingleMemeOrder from './meme-orders'

const SingleMemeSellList = props => {
  const {orders, user, memeStocks, memeId} = props
  return (
    <div>
      {orders.map(order => {
        return order.userId !== user.id &&
          memeStocks[memeId] &&
          memeStocks[memeId].quantity >= order.quantity ? (
          <SingleMemeOrder
            memeId={order.memeId}
            orderType={order.offerType}
            order={order}
            key={order.id}
          />
        ) : (
          ''
        )
      })}
    </div>
  )
}

const mapState = state => ({
  memeStocks: state.memeStocks.byId
})
export default connect(mapState)(SingleMemeSellList)
