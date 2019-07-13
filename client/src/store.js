import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user-reducer'

const reducers = combineReducers({
  userReducer: userReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store