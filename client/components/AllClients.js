import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllClients} from '../store/clients'

const AllClients = props => {
  useEffect(() => {
    props.getAllClients()
  }, [])

  return (
    <div className="All-Clients">
      <h1> All Client Page</h1>
      {props.clients.map(client => (
        <div key={client.id} className="all-users">
          <Link to={`/clients/${client.id}`}>
            <div>
              <h3>{client.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.clients.allClients
})

const mapDispatchToProps = dispatch => ({
  getAllClients: () => dispatch(getAllClients())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllClients)
