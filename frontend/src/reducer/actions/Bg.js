// @flow

import {
    UPDATE_TRANSITION_PROGRESS,
    UPDATE_FRONT_LAYERS,
    UPDATE_BACK_LAYERS,
    UPDATE_CACHE_LAYERS,
    TRANSLATE_X_LAYERS_BGS,
} from '../Bg'

import type {
    Action as BgAction,
    BgLayer,
} from '../BgTypes.jsx'

const translateXLayersBgs = progress => ({
    type: TRANSLATE_X_LAYERS_BGS,
    progress,
})

const updateCacheLayers = (cacheLayers: Array<BgLayer>): BgAction => ({
    type: UPDATE_CACHE_LAYERS,
    cacheLayers,
})

const updateFrontLayers = (frontLayers: Array<BgLayer>): BgAction => ({
    type: UPDATE_FRONT_LAYERS,
    frontLayers,
})

const updateBackLayers = (backLayers: Array<BgLayer>): BgAction => ({
    type: UPDATE_BACK_LAYERS,
    backLayers,
})

const updateTransitionProgress = (transitionProgress: number): BgAction => ({
    type: UPDATE_TRANSITION_PROGRESS,
    transitionProgress,
})

export {
    updateTransitionProgress,
    updateFrontLayers,
    updateBackLayers,
    updateCacheLayers,
    translateXLayersBgs,
}
