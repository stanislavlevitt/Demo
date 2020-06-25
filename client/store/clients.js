/* eslint-disable no-case-declarations */
import axios from 'axios'

const GOT_ALL_CLIENTS = 'GOT_ALL_CLIENTS'
const GOT_CLIENT = 'GOT_CLIENT'

const defaultState = {
  allClients: [],
  singleClient: {}
}

const gotAllClients = clients => ({
  type: GOT_ALL_CLIENTS,
  clients
})

const gotClient = client => ({
  type: GOT_CLIENT,
  client
})

export const getAllClients = () => async dispatch => {
  try {
    const res = await axios.get('/api/clients')
    dispatch(gotAllClients(res.data || defaultState.allClients))
  } catch (err) {
    console.error(err)
  }
}

export const getClient = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/clients/${id}`)
    dispatch(gotClient(data || defaultState.singleClient))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_ALL_CLIENTS:
      return {...state, allClients: action.clients}
    case GOT_CLIENT:
      return {...state, singleClient: action.client}
    default:
      return state
  }
}
