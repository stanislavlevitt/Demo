/* eslint-disable no-case-declarations */
import axios from 'axios'

const GOT_FILTERED_FUNDS = 'GOT_FILTERED_FUNDS'
const GOT_ALL_FUNDS = 'GOT_ALL_FUNDS'

const defaultState = {
  allFunds: []
}

const gotFilteredFunds = funds => ({
  type: GOT_FILTERED_FUNDS,
  funds
})

const gotALLFunds = funds => ({
  type: GOT_ALL_FUNDS,
  funds
})

export const getFilteredFunds = clientId => async dispatch => {
  try {
    const res = await axios.get(`/api/funds/${clientId}`)
    dispatch(gotFilteredFunds(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllFunds = () => async dispatch => {
  try {
    const res = await axios.get(`/api/funds`)
    dispatch(gotALLFunds(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_FILTERED_FUNDS:
      return {...state, allFunds: action.funds}
    case GOT_ALL_FUNDS:
      return {...state, allFunds: action.funds}
    default:
      return state
  }
}
