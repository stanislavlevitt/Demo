import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import {gotProductFromServer} from '../store/product'
import UpdateForm from './UpdateProductForm'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: 0,
      imageUrl: '',
      quantity: 0
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
        quantity: this.props.selectedProduct.quantity
      })
    }
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const {name, price, imageUrl, quantity} = this.state
      // const { updateTodo } = this.props;
      const {data} = await Axios.put(
        `/api/products/${this.props.match.params.id}`,
        {name, price, imageUrl, quantity}
      )
      // updateTodo(res.data);
      this.setState({
        taskName: '',
        assignee: ''
      })
    } catch (error) {
      this.setState({
        error: error.toString()
      })
    }
  }

  handleChange(event) {
    try {
      console.log('Changing', this.state)
      this.setState({
        [event.target.name]: event.target.value
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const product = this.props.selectedProduct
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
            quantity={this.state.quantity}
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
    gotProductFromServer: productId => dispatch(gotProductFromServer(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
