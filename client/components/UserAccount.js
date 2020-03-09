import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {viewUser} from '../store/user'

export class UserAccount extends Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    const user = this.props.user.selectedUser
    return (
      <div>
        <h1> Account Info</h1>
        <div>
          <h3>Name: {user.name}</h3>
          <h3>Email: {user.email}</h3>
          {user.isAdmin && <p>{user.name} is an Admin user</p>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  // viewUser: id => dispatch(viewUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
