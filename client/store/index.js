import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import clients from './clients'
import funds from './funds'
import investments from './investments'
import cashFlow from './cashFlow'

const reducer = combineReducers({
  clients,
  funds,
  investments,
  cashFlow
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)
const store = createStore(reducer, middleware)

export default store
