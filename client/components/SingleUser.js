import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewUser, UpdateAdminStatus} from '../store/user'

export class SingleUser extends Component {
  constructor() {
    super()
    this.adminUpdate = this.adminUpdate.bind(this)
  }

  componentDidMount() {
    this.props.viewUser(this.props.match.params.id)
  }

  adminUpdate() {
    this.props.adminUpdate(this.props.user.id)
  }
  render() {
    const {user} = this.props
    return (
      <div>
        <h1>SINGLE USER</h1>
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          {user.isAdmin && <p>{user.name} is an Admin user</p>}
          {!user.isAdmin && (
            <p>{user.name} doesn't not have Admin Privileges</p>
          )}
          <p>
            <button type="button" onClick={this.adminUpdate}>
              Change Admin Status
            </button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.viewedUser
})

const mapDispatchToProps = dispatch => ({
  viewUser: id => dispatch(viewUser(id)),
  adminUpdate: id => dispatch(UpdateAdminStatus(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
