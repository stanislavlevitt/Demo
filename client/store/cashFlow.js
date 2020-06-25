/* eslint-disable no-case-declarations */
import axios from 'axios'
const numeral = require('numeral')

const GOT_CASHFLOW_VALUE = 'GOT_CASHFLOW_VALUE'

const defaultState = {
  currentValue: ''
}

const gotCashFlowValue = investment => ({
  type: GOT_CASHFLOW_VALUE,
  investment
})

export const getCashFlowValue = investmentId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cashFlow/${investmentId}`)
    const value = (Number(data[0].return) + 1) * data[0].investment.amount
    const strValue = numeral(value.toFixed(2)).format('$0,0.00')
    dispatch(gotCashFlowValue(strValue))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_CASHFLOW_VALUE:
      return {...state, currentValue: action.investment}
    default:
      return state
  }
}
