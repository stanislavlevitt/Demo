/* eslint-disable no-case-declarations */
import axios from 'axios'

const GOT_ALL_FUNDS = 'GOT_ALL_FUNDS'

const defaultState = {
  allFunds: []
}

const gotAllFunds = funds => ({
  type: GOT_ALL_FUNDS,
  funds
})

export const getAllFunds = clientId => async dispatch => {
  try {
    const res = await axios.get(`/api/funds/${clientId}`)
    dispatch(gotAllFunds(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_ALL_FUNDS:
      return {...state, allFunds: action.funds}
    default:
      return state
  }
}
