import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import appReducer from './App'
import sidebarReducer from './Sidebar'

export default combineReducers({
  routing: routerReducer,
  appReducer,
  sidebarReducer,
})
