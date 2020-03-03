import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gotProductFromServer} from '../store/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
  }

  componentDidMount() {
    this.props.gotProductFromServer(this.props.match.params.id)
  }

  render() {
    const product = this.props.selectedProduct
    return (
      <div className="product-item">
        <div id="backgroundimg">
          <h3>{product.name}</h3>
          <h3>Price: {product.price}$</h3>
          <img src={product.imageUrl} />
          <p>
            <button>Add to cart</button>{' '}
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
