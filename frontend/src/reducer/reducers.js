import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import headerReducer from './Header.js'
import appReducer from './App'
import sidebarReducer from './Sidebar'

export default combineReducers({
    routing: routerReducer,
    appReducer,
    headerReducer,
    sidebarReducer,
})
