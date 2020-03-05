import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const GOT_ALL_USERS = 'GOT_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  allUsers: [],
  selectedUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const gotAllUsers = users => ({type: GOT_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const getAllUsers = () => async dispatch => {
  console.log('In the Get Alluser')
  try {
    const res = await axios.get('/api/users')
    console.log('In the Get Alluser -DATA', res.data)
    dispatch(gotAllUsers(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (name, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {name, email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    alert("YOU'RE LOGGED IN!")
    history.push('/products')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log("What's the action", action.user)
      return {...state, selectedUser: action.user}
    case REMOVE_USER:
      return {...state, selectedUser: {}}
    case GOT_ALL_USERS:
      console.log("What's the action", action)
      return {...state, allUsers: action.users}
    default:
      return state
  }
}
