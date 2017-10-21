// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducer/reducers.js'

import { initialState as appInitialState } from './reducer/App.js'
import { initialState as bgInitialState } from './reducer/Bg.js'
import { initialState as headerInitialState } from './reducer/Header.js'
import { initialState as sidebarInitialState } from './reducer/Sidebar.js'

import type {
    State,
    Store,
} from './storeTypes.jsx'

export const history = createHistory()

export const initialState: State = {
    routing: {
        location: {
            pathname: '/',
            search: '',
            hash: '',
            key: '',
        },
    },
    appReducer: appInitialState,
    bgReducer: bgInitialState,
    headerReducer: headerInitialState,
    sidebarReducer: sidebarInitialState,
}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)


const store: Store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)


export default store
