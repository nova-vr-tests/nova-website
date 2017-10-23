// @flow

import type {
    IBgLayer,
} from '../pages/types.jsx'

import type {
    Page,
} from './PresentationTypes.jsx'

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


type BgNone = -1
type BgParalaxType = 0
type BgSplitType = 1

export type TransitionTypes = BgParalaxType | BgSplitType | BgNone

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
    types: {
        BG_PARALAX: BgParalaxType,
        BG_SPLIT: BgSplitType,
        NONE: BgNone,
    },
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

