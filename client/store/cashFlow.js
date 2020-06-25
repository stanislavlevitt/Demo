/* eslint-disable no-case-declarations */
import axios from 'axios'
const numeral = require('numeral')

const GOT_CASHFLOW_VALUE = 'GOT_CASHFLOW_VALUE'

const defaultState = {
  amount: '',
  currentValue: ''
}

const gotCashFlowValue = (amountWithRate, amountBeforeRate) => ({
  type: GOT_CASHFLOW_VALUE,
  amountWithRate,
  amountBeforeRate
})

export const getCashFlowValue = investmentId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cashFlow/${investmentId}`)
    const value = (Number(data[0].return) + 1) * data[0].investment.amount
    const strValue = numeral(value.toFixed(2)).format('$0,0.00')
    dispatch(gotCashFlowValue(strValue, data[0].investment.amount))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_CASHFLOW_VALUE:
      return {
        ...state,
        currentValue: action.amountWithRate,
        amount: action.amountBeforeRate
      }
    default:
      return state
  }
}
