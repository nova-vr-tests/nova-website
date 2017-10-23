// @flow

export type State = {
    currentPage: number,
    targetPage: number,
    transitionProgress: number,
    transitionDirection: number,
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
