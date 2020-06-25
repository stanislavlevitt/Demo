import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getClient} from '../store/clients'
import {getFilteredFunds} from '../store/funds'

const SingleUser = props => {
  const {client, funds} = props

  useEffect(() => {
    props.getClient(props.match.params.id)
    props.getFilteredFunds(props.match.params.id)
  }, [])

  return (
    <div className="Single-Client">
      <h1>{client.name}</h1>
      {funds ? (
        <table>
          <tbody>
            <tr>
              <th> Fund Name</th>
              <th>Type</th>
              <th>Inception Date</th>
              <th> Description </th>
            </tr>
            {funds.map(fund => (
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
  )
}

const mapStateToProps = state => ({
  client: state.clients.singleClient,
  funds: state.funds.allFunds
})

const mapDispatchToProps = dispatch => ({
  getClient: id => dispatch(getClient(id)),
  getFilteredFunds: id => dispatch(getFilteredFunds(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
