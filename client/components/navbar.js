import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCart, getCartLocally} from '../store/product'


class Navbar extends Component {
  componentDidMount(){
    if(this.props.isLoggedIn){
      this.props.getCart()
    }
    if(!this.props.isLoggedIn){
      this.props.getCartLocally()
    }
  }
  render(){
    return(
      <div>
          <nav>
            <div>
              <Link to="/home">Home</Link>
              {this.props.isLoggedIn && this.props.admin && <Link to="/adminPage">Admin Page</Link>}
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart({this.props.cart.length})</Link>
              {this.props.isLoggedIn && <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>}
              {!this.props.isLoggedIn && <Link to="/login">Login</Link>}
              {!this.props.isLoggedIn && <Link to="/signup">Sign Up</Link>}
            </div>
          </nav>
      <hr />
      </div>
    )
  }
} 


/** s
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.selectedUser.id,
    admin: state.user.selectedUser.isAdmin,
    cart: state.product.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {dispatch(logout())},
    getCart: () => dispatch(getCart()),
    getCartLocally: () => dispatch(getCartLocally())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
