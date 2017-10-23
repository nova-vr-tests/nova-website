// @flow

import * as React from 'react'

import { initialState } from '../../store.js'

import type {
    IBgLayer,
} from '../pages/types.jsx'

import type {
    ThemeNames,
} from '../../constantTypes.jsx'

export type ReduxState = {
    routing: typeof initialState.routing,
    appTheme: typeof initialState.appReducer.appTheme,
    currentPage: typeof initialState.appReducer.currentPage,
    windowWidth: typeof initialState.appReducer.windowWidth,
    isFooterOpened: typeof initialState.appReducer.isFooterOpened,
    goToPage: typeof initialState.appReducer.goToPage,
}

export type ReduxDispatch = {
    updateTransitionProgress: (p: typeof initialState.bgReducer.transitionProgress) => void,
    updateBackLayers: (l: typeof initialState.bgReducer.backLayers) => void,
    goTo: (url: string) => void,
    updateLinePosition: (p: typeof initialState.appReducer.linePosition) => void,
    updateAppTheme: (appTheme: typeof initialState.appReducer.appTheme) => void,
    updateCurrentPage: (currentPage: typeof initialState.appReducer.currentPage) => void,
    updateGoToPage: (goToPage: typeof initialState.appReducer.goToPage) => void,
}

// Data structure as input of Presentation comp
export type Page = {
    h1: string,
    h2: string,
    content: React.StatelessFunctionalComponent<{}>,
    path: string,
    layers: Array<IBgLayer>,
    pid: any, // Symbols not supported by flow
    linePosition: number,
    align: string,
    theme: ThemeNames,
    comp: React.StatelessFunctionalComponent<{}>,
}

export type OwnProps = {
    attachToMouseScroll: boolean,
    pages: Array<Page>,
}

export type Props = OwnProps & ReduxState & ReduxDispatch
