import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gotProductFromServer, updateCart} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {},
      itemQty: 1
    }
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
    this.updateCart = this.updateCart.bind(this)
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
    this.props.selectedProduct.purchaseQuantity = this.state.itemQty
    this.props.updateCart(this.props.selectedProduct)
  }

  render() {
    const product = this.props.selectedProduct
    return (
      <div className="product-item">
        <div id="backgrounding">
          <h3>{product.name}</h3>
          <img src={product.imageUrl} />
          <p>Price: {product.price}$</p>
          <div id="productQty">
            <button type="button" onClick={this.decrement}>
              -
            </button>
            <div>{this.state.itemQty}</div>
            <button type="button" onClick={this.increment}>
              +
            </button>
          </div>
          <p>
            <button onClick={this.updateCart}>
              <Link to="/cart">Add to cart</Link>
            </button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotProductFromServer: productId =>
      dispatch(gotProductFromServer(productId)),
    updateCart: product => dispatch(updateCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
