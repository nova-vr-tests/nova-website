// @flow

import * as React from 'react'
import { initialState as state } from '../../store.js'

export type ReduxState = {
      linePosition: state.appReducer.linePosition,
      appTheme: state.appReducer.appTheme,
      windowWidth: state.appReducer.windowWidth,
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
}

export type ReduxDispatch = {
}

export type OwnProps = {
    comp: React.Node,
}

export type Props = OwnProps & ReduxState & ReduxDispatch
