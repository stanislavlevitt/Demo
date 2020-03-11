import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  updateQtyItem,
  updateCart,
  getCart,
  deleteItem,
  deleteItemLocally,
  updateQtyItemLocally
} from '../store/product'

class CartLine extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }

  increment() {
    const cartLine = this.props.cartLine.itemized
    if (cartLine.quantity >= this.props.cartLine.stock) {
    } else {
      cartLine.quantity = cartLine.quantity + 1
      if (this.props.isLoggedIn) {
        this.props.updateQtyItem(cartLine.quantity, this.props.cartLine)
      }
      if (!this.props.isLoggedIn) {
        this.props.updateQtyItemLocally(cartLine.quantity, cartLine.productId)
      }
    }
  }

  decrement() {
    const cartLine = this.props.cartLine.itemized
    if (cartLine.quantity > 0) {
      cartLine.quantity = cartLine.quantity - 1
      if (this.props.isLoggedIn) {
        this.props.updateQtyItem(cartLine.quantity, this.props.cartLine)
      }
      if (!this.props.isLoggedIn) {
        this.props.updateQtyItemLocally(cartLine.quantity, cartLine.productId)
      }
    }
  }

  handleDelete() {
    const cartLine = this.props.cartLine.itemized
    if (this.props.isLoggedIn) {
      this.props.deleteItem(cartLine.productId, cartLine.orderId, this.props.id)
    }
    if (!this.props.isLoggedIn) {
      this.props.deleteItemLocally(cartLine.productId)
    }
  }
  render() {
    const cartLine = this.props.cartLine.itemized
    return (
      <div>
        <li>
          <div className="cart-line">
            <div className="nameOnTheCart">{this.props.cartLine.name}</div>
            <div className="purchasePrice">
              <p className="pTag">Price</p>
              <p>${cartLine.purchasePrice}</p>
            </div>
            <div id="productQt">
              <button id="ButtonQT" type="button" onClick={this.increment}>
                +
              </button>
              <div id="productQtyValu">
                {this.props.cartLine.itemized.quantity}
              </div>
              <button id="ButtonQT" type="button" onClick={this.decrement}>
                -
              </button>
            </div>
            <div className="totalPrice">
              <p className="pTag">Total</p>
              <p>${cartLine.totalPrice}</p>
            </div>
            <div>
              <p>
                <input
                  productid={this.props.cartLine.itemized.productId}
                  orderid={this.props.cartLine.itemized.orderId}
                  className="deleteitem"
                  type="button"
                  value="Delete"
                  onClick={this.handleDelete}
                />
              </p>
            </div>
          </div>
        </li>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.selectedUser.id,
    id: state.user.selectedUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQtyItem: (itemQty, product) =>
      dispatch(updateQtyItem(itemQty, product)),
    updateCart: (product, itemQty) => dispatch(updateCart(product, itemQty)),
    getCart: () => dispatch(getCart()),
    deleteItem: (productId, orderId, userId) =>
      dispatch(deleteItem(productId, orderId, userId)),
    deleteItemLocally: productId => dispatch(deleteItemLocally(productId)),
    updateQtyItemLocally: (itemQuantity, productId) =>
      dispatch(updateQtyItemLocally(itemQuantity, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)
