import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gotProductFromServer} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {},
      itemQty: 1
    }
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
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
          {/* <div id="productQty">
            <button type="button">
                -
            </button>
              <div> {this.state.itemQty} </div>
              <button type="button">
                +
              </button>
          </div> */}
          <p>
            <button>Add to cart</button>
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
    gotProductFromServer: robotId => dispatch(gotProductFromServer(robotId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
