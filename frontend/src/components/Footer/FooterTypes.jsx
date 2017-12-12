// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
    introKeyframe: typeof initialState.appReducer.introKeyframe,
    isSidebarOpened: typeof initialState.sidebarReducer.isSidebarOpened,
    appTheme: typeof initialState.appReducer.appTheme,
    currentPage: typeof initialState.appReducer.currentPage,
    updateCurrentPage: typeof initialState.appReducer.goToPage,
    isFooterOpened: typeof initialState.appReducer.isFooterOpened,
    sidebarHeaderIntersection: typeof initialState.headerReducer.sidebarIntersection,
    currentFooterPage: typeof initialState.appReducer.currentFooterPage,
}

export type ReduxDispatch = {
    toggleSidebar: (_: void) => void,
    updateIsFooterOpened: (isFooterOpened: boolean) => void,
    updateCurrentFooterPage: (currentFooterPage: number) => void,
}

export type OwnProps = {}

export type Props = OwnProps & ReduxState & ReduxDispatch

export type PresentationControlsProps = {
    opacity: number
} & Props

export type ControlButtonProps = {
    targetPage: typeof initialState.appReducer.currentPage,
    isActive: boolean,
}
