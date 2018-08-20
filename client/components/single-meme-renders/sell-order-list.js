import React from 'react'
import {connect} from 'react-redux'
import SingleMemeOrder from './meme-orders'

const SingleMemeSellList = props => {
  const {orders, user, memeStocks, memeId} = props
  console.log(orders, 'sellOrders')
  console.log(memeId, 'memeId')
  return (
    <div>
      {orders.map(order => {
        console.log(memeStocks[memeId], 'memestocks[memeId]')
        return order.userId !== user.id &&
          memeStocks[memeId] &&
          +memeStocks[memeId].quantity >= +order.quantity &&
          order.status === 'Pending' ? (
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
