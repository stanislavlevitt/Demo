import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/user'
import SingleOrder from './SingleOrder'
import {Link} from 'react-router-dom'

export class UserAccount extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.selectedUser.id)
  }

  render() {
    const user = this.props.user.selectedUser
    const isFetching =
      !Array.isArray(this.props.orders) || this.props.orders === 0
    return (
      <div>
        <h2> Account Info </h2>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.address ? (
            <p>Address: {user.address}</p>
          ) : (
            <p>No address is associated with this user</p>
          )}
          {user.isAdmin && <p>Status: {user.name} is an Admin user</p>}
          <Link to={`/users/update/${user.id}`}>Edit user information</Link>
        </div>
        <h2> Order History </h2>
        {isFetching ? (
          <div>No Orders yet...</div>
        ) : (
          <div>
            {this.props.orders.map(order => (
              <div key={order.id}>
                <SingleOrder order={order} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.user.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: id => dispatch(getOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
