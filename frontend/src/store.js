// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducer/reducers.js'

import type { State as AppState } from './reducer/App.js'
import type { State as BgState } from './reducer/Bg.js'
import type { State as HeaderState } from './reducer/Header.js'
import type { State as SidebarState } from './reducer/Sidebar.js'

export const history = createHistory()

const initialState = {}
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

type RouterState = {
    location: {
        pathname: string,
        search: string,
        hash: string,
        key: string,
    }
}

type State = {
    routing: RouterState,
    appReducer: AppState,
    bgReducer: BgState,
    headerReducer: HeaderState,
    sidebarReducer: SidebarState,
}

type Store = {
    getState: () => State
}

const store: Store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)


export default store
