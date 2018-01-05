// @flow

import {
    UPDATE_TRANSITION_PROGRESS,
    UPDATE_FRONT_LAYERS,
    UPDATE_BACK_LAYERS,
    UPDATE_CACHE_LAYERS,
    UPDATE_IS_DREAMSCAPING,
    TRANSLATE_X_LAYERS_BGS,
} from '../Bg'

import type {
    Action as BgAction,
    BgLayer,
} from '../BgTypes.jsx'

const updateIsDreamscaping = isDreamscaping => ({
    type: UPDATE_IS_DREAMSCAPING,
    isDreamscaping,
})

const translateXLayersBgs = progress => ({
    type: TRANSLATE_X_LAYERS_BGS,
    progress,
})

const updateCacheLayers = (cacheLayers: Array<BgLayer>, cacheLayersPid = 0): BgAction => ({
    type: UPDATE_CACHE_LAYERS,
    cacheLayers,
    cacheLayersPid,
})

const updateFrontLayers = (frontLayers: Array<BgLayer>, frontLayersPid = 0): BgAction => ({
    type: UPDATE_FRONT_LAYERS,
    frontLayers,
    frontLayersPid,
})

const updateBackLayers = (backLayers: Array<BgLayer>, backLayersPid = 0): BgAction => ({
    type: UPDATE_BACK_LAYERS,
    backLayers,
    backLayersPid,
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
    updateIsDreamscaping,
    translateXLayersBgs,
}
