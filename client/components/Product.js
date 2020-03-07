import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  gotProductFromServer,
  updateCart,
  updateCartLocally
} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQty: 1
    }
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.updateCartLocally = this.updateCartLocally.bind(this)
  }

  componentDidMount() {
    this.props.gotProductFromServer(this.props.match.params.id)
  }

  decrement() {
    if (this.state.itemQty > 0) {
      this.setState({
        itemQty: this.state.itemQty - 1
      })
    }
  }

  increment() {
    if (this.state.itemQty >= this.props.selectedProduct.quantity) {
      alert('PRODUCT SOLD OUT')
    } else {
      this.setState({
        itemQty: this.state.itemQty + 1
      })
    }
  }

  updateCart() {
    this.props.updateCart(this.props.selectedProduct, this.state.itemQty)
    alert('THIS ITEM HAS BEEN ADDED TO YOUR CART')
  }

  updateCartLocally() {
    this.props.updateCartLocally(this.props.selectedProduct, this.state.itemQty)
    alert('THIS ITEM HAS BEEN ADDED TO YOUR CART')
  }

  render() {
    const product = this.props.selectedProduct
    return (
      <div className="single-product-div">
        <div id="backgrounding">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} />
          <p>Price: {product.price}$</p>
          <div id="productQty">
            <button id="ButtonQTY" type="button" onClick={this.decrement}>
              -
            </button>
            <div id="productQtyValue">{this.state.itemQty}</div>
            <button id="ButtonQTY" type="button" onClick={this.increment}>
              +
            </button>
          </div>
          <p>
            {this.props.isLoggedIn && (
              <button type="button" onClick={this.updateCart}>
                <Link to="/products">Add to cart</Link>
              </button>
            )}
            {!this.props.isLoggedIn && (
              <button type="button" onClick={this.updateCartLocally}>
                <Link to="/products">Add to cart</Link>
              </button>
            )}
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct,
    isLoggedIn: !!state.user.selectedUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotProductFromServer: productId =>
      dispatch(gotProductFromServer(productId)),
    updateCart: (product, itemQty) => dispatch(updateCart(product, itemQty)),
    updateCartLocally: (product, itemQty) =>
      dispatch(updateCartLocally(product, itemQty))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
