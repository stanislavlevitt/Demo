import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart, purchaseOrder} from '../store/product'

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.purchaseOrder = this.purchaseOrder.bind(this)
  }

  async componentDidMount() {
    this.props.getCart()
  }

  purchaseOrder() {
    this.props.purchaseOrder(this.props.status)
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
        <button onCLick={this.purchaseOrder}>
          <a href="/checkout">checkout</a>
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
