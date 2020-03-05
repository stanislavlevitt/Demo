import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gotProductFromServer, updateCart} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
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
    this.props.updateCart(this.props.selectedProduct, this.state.itemQty)
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
    updateCart: (product, itemQty) => dispatch(updateCart(product, itemQty))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
