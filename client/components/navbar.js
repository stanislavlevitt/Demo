import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navLinks">
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a> */}

          <h4>
            <a href="/home">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </h4>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link> */}
          <h4>
            <a href="/home">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
            <a href="/cart">Cart</a>
          </h4>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/** s
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
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
