import axios from 'axios'

const initialState = {
  guestCart: [],
  products: [],
  cart: [],
  selectedProduct: {}
}
/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const GET_CART = 'GET_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const DELETE = 'DELETE'
const PURCHASE_ORDER = 'PURCHASE_ORDER'
const UPDATE_CART_LOCALLY = 'UPDATE_CART_LOCALLY'
const GET_CART_LOCALLY = 'GET_CART_LOCALLY'
const DELETE_ITEM_LOCALLY = 'DELETE_ITEM_LOCALLY'

/**
 * INITIAL STATE


/**
 * ACTION CREATORS
 */
export const gotAllProduct = products => ({type: GOT_ALL_PRODUCTS, products})
export const gotProduct = product => ({type: GOT_PRODUCT, product})
export const UpdateCart = () => ({type: UPDATE_CART})
export const GetCart = products => ({type: GET_CART, products})
export const UpdateQty = item => ({type: UPDATE_QTY, item})
export const DeleteItem = (productId, orderId) => ({
  type: DELETE,
  productId,
  orderId
})
export const Purchase = user => ({type: PURCHASE_ORDER, user})
export const UpdateCartLocally = item => ({type: UPDATE_CART_LOCALLY, item})
export const GetCartLocally = array => ({type: GET_CART_LOCALLY, array})
export const DeleteItemLocally = () => ({type: DELETE_ITEM_LOCALLY})

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

export const gotAllProductFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProduct(data))
  } catch (err) {
    console.error(err)
  }
}
export const deleteProudct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(gotAllProductFromServer())
  } catch (error) {
    console.log(error)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(GetCart(data.products))
  } catch (error) {
    console.log(error)
  }
}

export const getCartLocally = () => async dispatch => {
  try {
    const array = []
    for (let i = 0; i < localStorage.length; i++) {
      const item = localStorage.key(i)
      const deserializeItem = JSON.parse(localStorage.getItem(item))
      array.push(deserializeItem)
    }
    dispatch(GetCartLocally(array))
  } catch (error) {
    console.log(error)
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

export const updateQtyItem = (itemQty, product) => async dispatch => {
  try {
    const {data} = await axios.put('/api/itemizeds/updateQty', {
      itemQty,
      product
    })
    dispatch(UpdateQty(data))
    dispatch(getCart())
  } catch (error) {
    console.log(error)
  }
}

export const deleteItem = (productId, orderId) => async dispatch => {
  try {
    await axios.delete(`/api/itemizeds/${productId}/${orderId}`)
    dispatch(getCart())
  } catch (error) {
    console.log(error)
  }
}

export const purchaseOrder = user => async dispatch => {
  try {
    const {data} = await axios.put('api/orders', {user})
    dispatch(Purchase(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateCartLocally = (product, itemQty) => async dispatch => {
  try {
    if (localStorage.getItem(`product${product.id}`) === null) {
      const item = {
        name: product.name,
        quantity: product.quantity,
        itemized: {
          purchasePrice: product.price,
          quantity: itemQty,
          totalPrice: product.price * itemQty,
          productId: product.id
        }
      }
      const stringifyItem = JSON.stringify(item)
      localStorage.setItem(`product${product.id}`, stringifyItem)
    } else {
      console.log(JSON.parse(localStorage.getItem(`product${product.id}`)))
      const deserializeToUpdate = JSON.parse(
        localStorage.getItem(`product${product.id}`)
      )
      deserializeToUpdate.itemized.quantity =
        deserializeToUpdate.itemized.quantity + itemQty
      deserializeToUpdate.itemized.totalPrice =
        product.price * deserializeToUpdate.itemized.quantity
      localStorage.setItem(
        `product${product.id}`,
        JSON.stringify(deserializeToUpdate)
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemLocally = productId => async dispatch => {
  try {
    localStorage.removeItem(`product${productId}`)
    dispatch(getCartLocally())
  } catch (error) {
    console.log(error)
  }
}

export const updateQtyItemLocally = (itemQty, productId) => async dispatch => {
  try {
    const itemToUpdate = JSON.parse(localStorage.getItem(`product${productId}`))
    itemToUpdate.itemized.quantity = itemQty
    itemToUpdate.itemized.totalPrice =
      itemToUpdate.itemized.purchasePrice * itemQty
    localStorage.setItem(`product${productId}`, JSON.stringify(itemToUpdate))
    dispatch(getCartLocally())
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GOT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case UPDATE_CART:
      return {...state}
    case GET_CART:
      return {...state, cart: action.products}
    case UPDATE_QTY:
      return {...state}
    case UPDATE_CART_LOCALLY:
      return {...state, cart: [...state.cart, action.item]}
    case GET_CART_LOCALLY:
      return {...state, cart: action.array}
    default:
      return state
  }
}
