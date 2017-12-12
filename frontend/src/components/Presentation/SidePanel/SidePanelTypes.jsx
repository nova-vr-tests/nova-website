// @flow

import * as React from 'react'

import { initialState } from '../../../store.js'

import type { Page } from '../PresentationTypes.jsx'

export type ReduxState = {
    linePosition: typeof initialState.appReducer.linePosition,
}

export type ReduxDispatch = {
}

export type OwnProps = {
    comp: React.Node,
    currentPage: number,
    pages: Array<Page>,
    type: number,
    marginTop: string,
}

export type SmartCompProps = {
    isOpened: boolean,
    width: number,
    setWidth: number => void,
    setIsOpened: boolean => void,
}

export type Props = OwnProps & SmartCompProps & ReduxState & ReduxDispatch


/**
    BG
*/

export type BgProps = {
    widthCoef: number,
    type: number,
}
