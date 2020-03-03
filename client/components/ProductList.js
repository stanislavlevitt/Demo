import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductList extends Component {
  _isMounted = false

  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    this._isMounted = true
    const {data: products} = await axios.get('/api/products')
    if (this._isMounted) {
      this.setState({products})
    }
  }

  render() {
    return (
      <div id="product-container">
        {this.state.products.map(product => (
          <div key={product.id} className="product-item">
            <div id="backgroundimg">
              <h3>{product.name}</h3>
              <h3>Price: {product.price}$</h3>
              <img src={product.imageUrl} />
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchProduct: productId => dispatch(gotProductFromServer(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
