import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllUsers} from '../store/user'

export class AdminPage extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    console.log('Users', this.props.users)
    return (
      <div className="single-product-div">
        <h1>Admin Page</h1>
        <h2>All site Users</h2>
        {this.props.users.map(user => (
          <Link key={user.id} to={`/user/${user.id}`}>
            <div>
              <h3>{user.name}</h3>
              <p>Email: {user.email}$</p>
              {user.isAdmin && <p>{user.name} is an Admin user</p>}
              {!user.isAdmin && (
                <p>{user.name} doesn't not have Admin Privileges</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.allUsers
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
