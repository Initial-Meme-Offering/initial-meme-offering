import React from 'react'
import SingleMemeOrder from './meme-orders'

const SingleMemeBuyList = props => {
  const {orders, user} = props
  return (
    <div>
      {orders.map(order => {
        return order.userId !== user.id ? (
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
export default SingleMemeBuyList
