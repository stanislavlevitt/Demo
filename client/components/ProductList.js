import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct, gotAllProductFromServer} from '../store/product'

class ProductList extends Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  deleteProduct(id) {
    this.props.deleteProduct(id)
  }

  render() {
    const {admin, products} = this.props
    return (
      <div id="product-container">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div id="backgroundimg">
              <h3>{product.name}</h3>
              <h3>Price: {product.price}$</h3>
              <img src={product.imageUrl} />
              {admin && (
                <p>
                  <button
                    type="button"
                    onClick={() => this.deleteProduct(product.id)}
                  >
                    Delete this item
                  </button>
                </p>
              )}
              <p>
                <Link to={`/products/${product.id}`}>Purchase here</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    admin: state.user.selectedUser.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(gotAllProductFromServer()),
    deleteProduct: productId => dispatch(deleteProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
