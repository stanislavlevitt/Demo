import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const SingleOrder = props => {
  const {order} = props
  return (
    <div className="order row" key={order.id}>
      <div className="column">
        {/* <Link to={`/orders/${order.id}`}> */}
        <h3>Order No.{order.id}</h3>
        <h5>Date: {order.purchaseDate}</h5>
        <h5>Total: $ {order.totalPrice}</h5>
        {/* </Link> */}
      </div>
      <div className="column">{}</div>
    </div>
  )
}

export default SingleOrder
