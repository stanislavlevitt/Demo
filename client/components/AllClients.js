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
      <div className="Clients-List">
        {props.clients.map(client => (
          <Link to={`/clients/${client.id}`} key={client.id}>
            <h3>{client.name}</h3>
          </Link>
        ))}
      </div>
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
