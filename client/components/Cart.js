import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CartLine from './CartLine'
import {getCart} from '../store/product'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
        <button>Checkout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
