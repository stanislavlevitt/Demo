import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateQtyItem, updateCart, getCart} from '../store/product'
import {get} from 'http'

class CartLine extends Component {
  constructor(props) {
    super(props)
    // this.decrement = this.decrement.bind(this)
    // this.increment = this.increment.bind(this)
  }

  // increment(){
  //   const itemQty = this.props.cartLine.itemized.quantity + 1;
  //   this.props.updateQtyItem(itemQty, this.props.cartLine)
  //   this.props.getCart()
  // }

  // decrement(){
  //   const itemQty = this.props.cartLine.itemized.quantity - 1;
  //   this.props.updateQtyItem(itemQty, this.props.cartLine)
  //   this.props.getCart()
  // }

  render() {
    const cartLine = this.props.cartLine.itemized
    return (
      <div>
        <li>
          <div
            className="cart-line"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px'
            }}
          >
            <div
              style={{
                width: '25%',
                fontSize: '20px',
                borderBottom: '1px solid black'
              }}
            >
              {cartLine.productName}
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Price</p>
              <p>${cartLine.purchasePrice}</p>
            </div>

            <div id="productQt">
              <button id="ButtonQT" type="button" onClick={this.increment}>
                +
              </button>
              <div id="productQtyValu">{cartLine.quantity}</div>
              <button id="ButtonQT" type="button" onClick={this.decrement}>
                -
              </button>
            </div>

            {/* <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Quantity</p>
              <p>
                <input
                  onChange={evt => this.handleChange(evt.target.value)}
                  type="number"
                  id="itemQuantity"
                  name="itemQuantity"
                  value={cartLine.quantity}
                  style={{width: '25px'}}
                />
              </p>
            </div> */}
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Total</p>
              <p>${cartLine.totalPrice}</p>
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
    getCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)
