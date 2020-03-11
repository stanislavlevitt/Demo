import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/product'
import AddForm from './AddProductForm'

class AddProduct extends React.Component {
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

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.addProduct(this.state)
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
          <h1>ADD PRODUCT PAGE</h1>
          <AddForm
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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
