import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  ProductList,
  Product,
  Cart,
  AdminPage,
  AllUsers,
  SingleUser,
  UpdateUser,
  Checkout,
  UserAccount,
  UpdateProduct
} from './components'
import {me} from './store'
import {getCart, getCartLocally} from './store/product'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn, admin} = this.props
    if (isLoggedIn) {
      this.props.getCart()
    }
    if (!isLoggedIn) {
      this.props.getCartLocally()
    }
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/" component={ProductList} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/products" component={UserHome} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products/:id" component={Product} />
            <Route
              exact
              path="/products/update/:id"
              component={UpdateProduct}
            />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route exact path="/adminPage" component={AdminPage} />
            <Route exact path="/user/:id" component={SingleUser} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/account" component={UserAccount} />
            <Route exact path="/users/update/:id" component={UpdateUser} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.selectedUser.id,
    admin: state.user.selectedUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCart: () => dispatch(getCart()),
    getCartLocally: () => dispatch(getCartLocally())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
