// @flow
import { initialState } from '../../store.js'

export type ReduxState = {
    currentFooterPage: typeof initialState.appReducer.currentFooterPage,
}

export type OwnProps = {
    opacity: number,
    windowWidth: number,
}

export type Props = OwnProps & ReduxState & ReduxDispatch
