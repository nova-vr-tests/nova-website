// @flow
import { initialState } from '../../store.js'

export type ReduxState = {
    currentFooterPage: typeof initialState.appReducer.currentFooterPage,
    isSidebarOpened: typeof initialState.appReducer.isSidebarOpened,
}

export type OwnProps = {
    opacity: number,
    windowWidth: number,
    bgUrl: string,
}


export type Props = OwnProps & ReduxState
