import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart} from '../store/product'

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(cartSingle => (
            <CartLine key={cart.id} cartLine={cartSingle} />
          ))}
        </ul>
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
