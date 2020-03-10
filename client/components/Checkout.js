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
    this.props.purchaseOrder(this.props.user, this.props.userId)
    let x = document.getElementById('modal-body')
    x.className = 'show'
    setTimeout(function() {
      x.className = x.className.replace('show', '')
    }, 4000)
  }

  render() {
    const cart = this.props.cart
    return (
      <div id="cart">
        <h2>Purchase</h2>
        <ul>{cart.map(item => <CartLine key={item.id} cartLine={item} />)}</ul>
        <h3>Total : ${this.props.totalPrice} </h3>
        <button type="button" onClick={this.purchaseOrder}>
          <a>Purchase</a>
        </button>
        <div className="modal-body" id="modal-body">
          Purchase Success!
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart,
  user: state.user,
  userId: state.user.selectedUser.id,
  totalPrice: state.product.total
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    purchaseOrder: (status, id) => dispatch(purchaseOrder(status, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
