import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'

export class AdminPage extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    console.log('Admin Component, state.user.allusers', this.props.users)
    return (
      <div className="single-product-div">
        <h1>AdminPage Page</h1>
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
