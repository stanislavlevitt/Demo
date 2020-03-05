import axios from 'axios'
import history from '../history'

const initialState = {
  products: [],
  cart: [],
  selectedProduct: {}
}
/**
 * ACTION TYPES
 */
const GOT_PRODUCT = 'GOT_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const GET_CART = 'GET_CART'
const UPDATE_QTY = 'UPDATE_QTY'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
export const gotProduct = product => ({type: GOT_PRODUCT, product})
export const UpdateCart = () => ({type: UPDATE_CART})
export const GetCart = products => ({type: GET_CART, products})
export const UpdateQty = item => ({type: UPDATE_QTY, item})
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

export const updateCart = (product, itemQty) => async dispatch => {
  try {
    await axios.post(`/api/itemizeds`, {product, itemQty})
    dispatch(getCart())
  } catch (err) {
    console.error(err)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(GetCart(data.products))
  } catch (error) {
    next(error)
  }
}

export const updateQtyItem = (itemQty, product) => async dispatch => {
  try {
    const {data} = await axios.put('/api/itemizeds', {itemQty, product})
    console.log('------>', data)
    dispatch(UpdateQty(data))
  } catch (error) {
    next(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case UPDATE_CART:
      return {...state}
    case GET_CART:
      return {...state, cart: action.products}
    case UPDATE_QTY:
      const copieCart = [...state.cart]
      copieCart.map(product => {
        if (
          product.itemized.productId === action.item.productId &&
          product.itemized.orderId === action.item.orderId
        ) {
          product.itemized = action.item
        }
      })

      return {...state, cart: copieCart}
    default:
      return state
  }
}
