import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getClient} from '../store/clients'
import {getAllFunds} from '../store/funds'

export class SingleUser extends Component {
  componentDidMount() {
    this.props.getClient(this.props.match.params.id)
    this.props.getAllFunds(this.props.match.params.id)
  }

  render() {
    const {client} = this.props
    return (
      <div className="Single-Client">
        <h1>{client.name}</h1>
        {this.props.funds ? (
          <table>
            <tbody>
              <tr>
                <th> Fund Name</th>
                <th>Type</th>
                <th>Inception Date</th>
                <th> Description </th>
              </tr>
              {this.props.funds.map(fund => (
                <tr key={fund.id}>
                  <td>{fund.name}</td>
                  <td>{fund.type}</td>
                  <td>{fund.inception}</td>
                  <td>{fund.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Client Fund Info</h1>
        )}
      </div>
      // <div>
      //   <h1>SINGLE USER</h1>
      //   <div>
      //     <h3>{user.name}</h3>
      //     <p>Email: {user.email}</p>
      //     {user.isAdmin && <p>{user.name} is an Admin user</p>}
      //     {!user.isAdmin && (
      //       <p>{user.name} doesn't not have Admin Privileges</p>
      //     )}
      //     <p>
      //       <button type="button" onClick={this.adminUpdate}>
      //         Change Admin Status
      //       </button>
      //     </p>
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.clients.singleClient,
  funds: state.funds.allFunds
})

const mapDispatchToProps = dispatch => ({
  getClient: id => dispatch(getClient(id)),
  getAllFunds: id => dispatch(getAllFunds(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
