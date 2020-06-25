import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
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
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './clients'
