import React, {Component} from 'react'
import {connect} from 'react-redux'

class CartLine extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cartLine = this.props.cartLine
    console.log(cartLine)
    return (
      <div id="cart-container">
        <li>
          <div>
            <p id="productName">{cartLine.name}</p>
            <p id="productName">Price: ${cartLine.price}</p>
            <p id="productName">Quantity: {cartLine.purchaseQuantity}</p>
            <p id="productName">
              Total: ${cartLine.purchaseQuantity * cartLine.price}
            </p>
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

export default connect(mapStateToProps, {})(CartLine)
