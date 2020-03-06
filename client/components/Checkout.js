import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartLine from './CartLine'
import {getCart, purchaseOrder} from '../store/product'

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.purchaseOrder = this.purchaseOrder.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  purchaseOrder() {
    this.props.purchaseOrder(this.props.user)
    alert('Purchase Success!')
    this.props.history.push('/products')
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Purchase</h2>
        <ul>{cart.map(item => <CartLine key={item.id} cartLine={item} />)}</ul>
        <button type="button" onClick={this.purchaseOrder}>
          <a>Purchase</a>
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    purchaseOrder: status => dispatch(purchaseOrder(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
