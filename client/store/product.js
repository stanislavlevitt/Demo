import axios from 'axios'
import history from '../history'

const initialState = {
  products: [],
  selectedProduct: {}
}
/**
 * ACTION TYPES
 */
const GOT_PRODUCT = 'GOT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
export const gotProduct = product => ({type: GOT_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const gotProductFromServer = productId => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(product))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return {...state, selectedProduct: action.product}
    default:
      return state
  }
}
