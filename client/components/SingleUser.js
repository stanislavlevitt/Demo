import React, {Component} from 'react'
import {connect} from 'react-redux'

export class SingleUser extends Component {
  render() {
    return (
      <div>
        <h1>SINGLE USER</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
