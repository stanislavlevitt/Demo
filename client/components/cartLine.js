import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateQtyItem, updateCart, getCart, deleteItem} from '../store/product'

class CartLine extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }

  increment() {
    if (this.props.cartLine.itemized.quantity >= this.props.cartLine.quantity) {
      alert('PRODUCT SOLD OUT')
    } else {
      this.props.cartLine.itemized.quantity =
        this.props.cartLine.itemized.quantity + 1
      this.props.updateQtyItem(
        this.props.cartLine.itemized.quantity,
        this.props.cartLine
      )
    }
  }

  decrement() {
    if (this.props.cartLine.itemized.quantity > 0) {
      this.props.cartLine.itemized.quantity =
        this.props.cartLine.itemized.quantity - 1
      this.props.updateQtyItem(
        this.props.cartLine.itemized.quantity,
        this.props.cartLine
      )
    }
  }

  handleDelete() {
    const cartLine = this.props.cartLine.itemized
    this.props.deleteItem(cartLine.productId, cartLine.orderId)
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
                  className="deleteRobot"
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQtyItem: (itemQty, product) =>
      dispatch(updateQtyItem(itemQty, product)),
    updateCart: (product, itemQty) => dispatch(updateCart(product, itemQty)),
    getCart: () => dispatch(getCart()),
    deleteItem: (productId, orderId) => dispatch(deleteItem(productId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)
