import React, {Component} from 'react'
import {connect} from 'react-redux'

class CartLine extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cartLine = this.props.cartLine
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
              {cartLine.name}
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Price</p>
              <p>${cartLine.price}</p>
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Quantity</p>
              <p>
                <input
                  onChange={evt => this.handleChange(evt.target.value)}
                  type="number"
                  id="itemQuantity"
                  name="itemQuantity"
                  value={cartLine.purchaseQuantity}
                  style={{width: '25px'}}
                />
              </p>
            </div>
            <div style={{width: '15%', borderBottom: '1px solid black'}}>
              <p style={{marginTop: 0}}>Total</p>
              <p>${cartLine.purchaseQuantity * cartLine.price}</p>
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

export default connect(mapStateToProps, {})(CartLine)
