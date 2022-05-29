import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers/rootReducer'
import thunk from 'redux-thunk'

let store = createStore(rootReducers, applyMiddleware(thunk))

export default store