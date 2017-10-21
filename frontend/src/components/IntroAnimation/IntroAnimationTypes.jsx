// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
    keyframe: typeof initialState.appReducer.introKeyframe
}

export type ReduxDispatch = {
    incrementIntroKeyframe: void => void,
}

export type OwnProps = {}

export type Props = OwnProps & ReduxState & ReduxDispatch
