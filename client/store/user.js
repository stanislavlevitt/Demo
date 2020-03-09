/* eslint-disable no-case-declarations */
import axios from 'axios'
import history from '../history'

const GOT_USER = 'GOT_USER'
const VIEW_USER = 'VIEW_USER'
const GOT_ALL_USERS = 'GOT_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const GOT_ORDERS = 'GOT_ORDERS'
const UPDATE_USER = 'UPDATE_USER'

const defaultUser = {
  allUsers: [],
  selectedUser: {},
  viewedUser: {},
  orders: {}
}

const gotUser = user => ({type: GOT_USER, user})
const adminViewUser = user => ({type: VIEW_USER, user})
const gotAllUsers = users => ({type: GOT_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
export const UpdatedUser = user => ({type: UPDATE_USER, user})
const gotOrders = orders => ({type: GOT_ORDERS, orders})

export const viewUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(adminViewUser(data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const getOrders = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(gotOrders(data))
  } catch (error) {
    console.error(err)
  }
}

export const UpdateAdminStatus = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    data.isAdmin = !data.isAdmin
    await axios.put(`/api/users/${id}`, data)
    dispatch(adminViewUser(data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(gotAllUsers(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (id, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user)
    dispatch(UpdatedUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (name, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {name, email, password})
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }
  try {
    dispatch(gotUser(res.data))
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

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_USER:
      return {...state, selectedUser: action.user}
    case REMOVE_USER:
      return {...state, selectedUser: {}}
    case GOT_ALL_USERS:
      return {...state, allUsers: action.users}
    case VIEW_USER:
      return {...state, viewedUser: action.user}
    case GOT_ORDERS:
      return {...state, orders: action.orders}
    case UPDATE_USER:
      const updatedUsers = state.allUsers.map(user => {
        if (user.id === action.user.id) {
          return action.user
        } else return user
      })
      return {...state, selectedUser: action.user, allUsers: updatedUsers}
    default:
      return state
  }
}
