import React from 'react'

const SingleOrder = props => {
  const {order} = props
  return (
    <div className="order row" key={order.id}>
      <div className="orderHistory">
        <h3>Order No.{order.id}</h3>
        <p className="pTag">Date: {order.purchaseDate}</p>
        <p className="pTag">Total: $ {order.totalPrice}</p>
      </div>
      <div className="column">{}</div>
    </div>
  )
}

export default SingleOrder
