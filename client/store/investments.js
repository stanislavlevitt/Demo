/* eslint-disable no-case-declarations */
import axios from 'axios'

const GOT_ALL_INVESTMENTS = 'GOT_ALL_INVESTMENTS'
const GOT_FILTERED_INVESTMENTS = 'GOT_FILTERED_INVESTMENTS'

const defaultState = {
  allInvestments: []
}

const gotAllInvestments = investment => ({
  type: GOT_ALL_INVESTMENTS,
  investment
})

export const gotFilteredInvestments = investment => ({
  type: GOT_FILTERED_INVESTMENTS,
  investment
})

export const getAllInvestments = () => async dispatch => {
  try {
    const res = await axios.get(`/api/investments`)
    dispatch(gotAllInvestments(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getFilteredInvestment = (clientId, fundId) => async dispatch => {
  try {
    const res = await axios.get(`/api/investments/${clientId}/${fundId}`)
    dispatch(gotFilteredInvestments(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_ALL_INVESTMENTS:
      return {...state, allInvestments: action.investment}
    case GOT_FILTERED_INVESTMENTS:
      return {...state, allInvestments: action.investment}
    default:
      return state
  }
}
