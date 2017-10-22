// @flow

import type {
    ISlide as Page,
    IBgLayer,
} from '../pages/types.jsx'

export type UpdateBackgroundLayers = (
    sign: number,
    pages: Array<Page>,
    currentPage: number,
) => {
    frontLayers: Array<IBgLayer>,
    backLayers: Array<IBgLayer>,
}

export type ResetBackgroundStyles = (
    layers: Array<IBgLayer>,
    progress: number,
) => Array<IBgLayer>

export type SlideTransition = (
    sign: number,
    pages: Array<Page>,
    currentPage: number,
    attachScrollEvent: void => void,
    detachScrollEvent: void => void,
) => void

type StartTransition = (
    type: number,
    params: {
        sign: number,
        pages: Array<Page>,
        currentPage: number,
        attachScrollEvent: void => void,
        detachScrollEvent: void => void,
    }
) => void

type TransitionTypes = {
    BG_PARALAX: 0,
    BG_SPLIT: 1,
}

export type Transitions = {
    splitBackground: {
        updateBackgroundLayers: UpdateBackgroundLayers,
        resetBackgroundStyles: ResetBackgroundStyles,
        slideTransition: SlideTransition,
    },
    bgParalax: {
        slideTransition: SlideTransition,
    },
    startTransition: StartTransition,
    types: TransitionTypes,
}

export type UpdateLayersOpacity = (
    layers: Array<IBgLayer>,
    opacity: number,
) => Array<IBgLayer>

export type UpdateFronLayersOpacity = (
    layers: Array<IBgLayer>,
    progress: number,
) => void

export type UpdateBg = (
    progress: number,
    pages: Array<Page>,
    currentPage: number,
    targetPage: number,
) => void

