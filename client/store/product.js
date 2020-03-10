/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import axios from 'axios'

const initialState = {
  products: [],
  cart: [],
  selectedProduct: {},
  total: 0
}

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const GET_CART = 'GET_CART'
const DELETE = 'DELETE'
const PURCHASE_ORDER = 'PURCHASE_ORDER'
const UPDATE_CART_LOCALLY = 'UPDATE_CART_LOCALLY'
const GET_CART_LOCALLY = 'GET_CART_LOCALLY'
const DELETE_ITEM_LOCALLY = 'DELETE_ITEM_LOCALLY'

export const GetCart = (products, totalPrice) => ({
  type: GET_CART,
  products,
  totalPrice
})
export const gotAllProduct = products => ({type: GOT_ALL_PRODUCTS, products})
export const gotProduct = product => ({type: GOT_PRODUCT, product})
export const UpdatedProduct = product => ({type: UPDATE_PRODUCT, product})
export const DeleteItem = (productId, orderId) => ({
  type: DELETE,
  productId,
  orderId
})
export const Purchase = user => ({type: PURCHASE_ORDER, user})
export const UpdateCartLocally = item => ({type: UPDATE_CART_LOCALLY, item})
export const GetCartLocally = (array, total) => ({
  type: GET_CART_LOCALLY,
  array,
  total
})
export const DeleteItemLocally = () => ({type: DELETE_ITEM_LOCALLY})

///Protected
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(GetCart(data.products, data.totalPrice))
  } catch (error) {
    console.log(error)
  }
}
///Protected
export const updateCart = (product, itemQty) => async dispatch => {
  try {
    await axios.post(`/api/itemizeds`, {product, itemQty})
    dispatch(getCart())
  } catch (err) {
    console.error(err)
  }
}
///Router doesn't need validation
export const gotProductFromServer = productId => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(product))
  } catch (err) {
    console.error(err)
  }
}
///Router doesn't need validation
export const gotAllProductFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProduct(data))
  } catch (err) {
    console.error(err)
  }
}
///Protected
export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(gotAllProductFromServer())
  } catch (error) {
    console.log(error)
  }
}
///Protected
export const updateProduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, product)
    dispatch(UpdatedProduct(data))
  } catch (err) {
    console.error(err)
  }
}
//Nopt sure if protected
export const updateQtyItem = (itemQty, product) => async dispatch => {
  try {
    await axios.put('/api/itemizeds/updateQty', {
      itemQty,
      product
    })
    dispatch(getCart())
  } catch (error) {
    console.log(error)
  }
}
///Protected
export const deleteItem = (productId, orderId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/itemizeds/${productId}/${orderId}/${userId}`)
    dispatch(getCart())
  } catch (error) {
    console.log(error)
  }
}
///Protected
export const purchaseOrder = (user, userId) => async dispatch => {
  try {
    console.log('ORDER', user)
    const {data} = await axios.put(`api/orders/${userId}`, {user})
    dispatch(Purchase(data))
  } catch (error) {
    console.error(error)
  }
}

export const getCartLocally = () => dispatch => {
  try {
    const guestCart = []
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const item = localStorage.key(i)
      const deserializeItem = JSON.parse(localStorage.getItem(item))
      total = total + deserializeItem.itemized.totalPrice
      guestCart.push(deserializeItem)
    }
    dispatch(GetCartLocally(guestCart, total))
  } catch (error) {
    console.log(error)
  }
}

export const updateCartLocally = (product, itemQty) => dispatch => {
  try {
    if (localStorage.getItem(`product${product.id}`) === null) {
      const item = {
        name: product.name,
        stock: product.stock,
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
      const deserialize = JSON.parse(
        localStorage.getItem(`product${product.id}`)
      )
      deserialize.itemized.quantity = deserialize.itemized.quantity + itemQty
      deserialize.itemized.totalPrice =
        product.price * deserialize.itemized.quantity
      localStorage.setItem(`product${product.id}`, JSON.stringify(deserialize))
    }
    dispatch(getCartLocally())
  } catch (error) {
    console.error(error)
  }
}

export const deleteItemLocally = productId => dispatch => {
  try {
    localStorage.removeItem(`product${productId}`)
    dispatch(getCartLocally())
  } catch (error) {
    console.log(error)
  }
}

export const updateQtyItemLocally = (itemQty, productId) => dispatch => {
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

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GOT_PRODUCT:
      return {...state, selectedProduct: action.product}
    case UPDATE_PRODUCT:
      const UpdatedProducts = state.products.map(product => {
        if (product.id === action.product.id) {
          return action.product
        } else return product
      })
      UpdatedProducts.sort(function(a, b) {
        return a.id - b.id
      })
      return {
        ...state,
        selectedProduct: action.product,
        products: UpdatedProducts
      }
    case GET_CART:
      return {...state, cart: action.products, total: action.totalPrice}
    case UPDATE_CART_LOCALLY:
      return {...state, cart: [...state.cart, action.item]}
    case GET_CART_LOCALLY:
      return {...state, cart: action.array, total: action.total}
    default:
      return state
  }
}
