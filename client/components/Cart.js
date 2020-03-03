import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CartLine from './cartLine'

class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cart = this.props.cart
    console.log(cart)
    return (
      <div id="cart">
        <h2>Cart</h2>
        <ul>{cart.map(cart => <CartLine key={cart.id} cartLine={cart} />)}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
