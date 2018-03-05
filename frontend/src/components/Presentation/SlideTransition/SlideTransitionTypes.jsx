// @flow
import { initialState } from '../../../store.js'

export type State = {
    currentPage: number,
    targetPage: number,
    transitionProgress: number,
    transitionDirection: number,
}

type ScrollEvent = {}
export type Props = {
    pathname: string,
    windowWidth: number,
    resetScrollEvent: ?(void => void),
    appTheme: typeof initialState.appReducer.appTheme,
    currentPage: number,
    pages: typeof initialState.appReducer.pages,
    linePosition: typeof initialState.appReducer.linePosition,
    scrollEvent: ?ScrollEvent,
}

export type OpacityStyles = {
    currentSlide: {
        opacity: number,
        position: 'absolute',
    },
    targetSlide: {
        opacity: number,
        position: 'absolute',
    },
}

export type TranslationStyles = {
    currentSlide: {
        transform: string,
        position: 'absolute',
    },
    targetSlide: {
        transform: string,
        position: 'absolute',
    },
}

export type TranslateTitle = (
    currentTitle: string,
    currentAlign: string,
    targetAlign: string,
    targetTitle: string,
    sign: number,
) => {
    transform: string,
}
