// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
    isSidebarOpened: typeof initialState.sidebarReducer.isSidebarOpened,
    appTheme: typeof initialState.appReducer.appTheme,
}

export type ReduxDispatch = {
    updateSidebarIntersection: (sidebarIntersection: number) => void,
    goTo: (url: string) => void,
}

export type OwnProps = {}

export type Props = OwnProps & ReduxState & ReduxDispatch
