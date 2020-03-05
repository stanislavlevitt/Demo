import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart, purchaseOrder} from '../store/product'

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.purchaseOrder = this.purchaseOrder.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  purchaseOrder() {
    this.props.purchaseOrder(this.props.status)
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Purchase</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
        <button>
          <a>Purchase</a>
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    purchaseOrder: status => dispatch(purchaseOrder(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
