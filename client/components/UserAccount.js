import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/user'

export class UserAccount extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getOrders(this.props.user.selectedUser.id)
  }

  render() {
    const user = this.props.user.selectedUser
    return (
      <div>
        <h1> Account Info</h1>
        <div>
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Address: {user.address}</h3>
          {user.isAdmin && <p>{user.name} is an Admin user</p>}
        </div>
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
