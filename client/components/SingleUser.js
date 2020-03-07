import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewUser} from '../store/user'

export class SingleUser extends Component {
  componentDidMount() {
    this.props.viewUser(this.props.match.params.id)
  }
  render() {
    const {user} = this.props
    console.log('USERS', user)
    return (
      <div>
        <h1>SINGLE USER</h1>
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}$</p>
          {user.isAdmin && <p>{user.name} is an Admin user</p>}
          {!user.isAdmin && (
            <p>{user.name} doesn't not have Admin Privileges</p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.viewedUser
})

const mapDispatchToProps = dispatch => ({
  viewUser: id => dispatch(viewUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
