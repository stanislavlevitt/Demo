import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, admin}) => (
<div>
  <nav>
    <div>
      <Link to="/home">Home</Link>
        {isLoggedIn && admin && <Link to="/adminPage">Admin Page</Link>}
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      {isLoggedIn && <a href="#" onClick={handleClick}>
                Logout
            </a>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
      </div>
      </nav>
      <hr />
      </div>)

/** s
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.selectedUser.id,
    admin: state.user.selectedUser.isAdmin
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
