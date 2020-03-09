import React from 'react'
import {connect} from 'react-redux'
import {gotProductFromServer, updateProduct} from '../store/product'
import UpdateForm from './UpdateProductForm'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      imageUrl: '',
      stock: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.gotProductFromServer(this.props.match.params.id)
  }

  componentDidUpdate(oldProps) {
    if (oldProps.selectedProduct !== this.props.selectedProduct) {
      this.setState({
        name: this.props.selectedProduct.name,
        price: this.props.selectedProduct.price,
        imageUrl: this.props.selectedProduct.imageUrl,
        stock: this.props.selectedProduct.stock
      })
    }
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.updateProduct(this.props.match.params.id, this.state)
      const {name, price, imageUrl, stock} = this.state
      this.setState({
        name: name,
        price: price,
        imageUrl: imageUrl,
        stock: stock
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange(event) {
    try {
      this.setState({
        [event.target.name]: event.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="single-product-div">
        <div id="backgrounding">
          <h1>EDIT PRODUCT PAGE</h1>
          <UpdateForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
            price={this.state.price}
            imageUrl={this.state.imageUrl}
            stock={this.state.stock}
          />
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
    updateProduct: (productId, product) =>
      dispatch(updateProduct(productId, product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
