import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart, getCartLocally} from '../store/product'

class Cart extends Component {
  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Cart({cart.length})</h2>
        {cart.length ? (
          <div>
            <ul>
              {cart.map(item => <CartLine key={item.id} cartLine={item} />)}
            </ul>
            <h3>Total : ${this.props.totalPrice} </h3>
            <button className="cartbuttons" type="button">
              <a href="/products">Continue Shopping</a>
            </button>
            <button className="cartbuttons" type="button">
              <a href="/checkout">Checkout</a>
            </button>
          </div>
        ) : (
          <div>
            <h3>You should probably buy something!</h3>
          </div>
        )}
        <div className="modal-body" id="modal-body">
          This is the maximum amount quantity for the current stock!
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.selectedUser.id,
  cart: state.product.cart,
  totalPrice: state.product.total
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getCartLocally: () => dispatch(getCartLocally())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
