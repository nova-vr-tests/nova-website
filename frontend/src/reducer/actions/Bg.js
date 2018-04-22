// @flow

import {
    UPDATE_TRANSITION_PROGRESS,
    UPDATE_FRONT_LAYERS,
    UPDATE_BACK_LAYERS,
    UPDATE_CACHE_LAYERS,
    UPDATE_IS_DREAMSCAPING,
    TRANSLATE_X_LAYERS_BGS,
    UPDATE_ALL_LAYERS_URL,
    RESET_CACHE_LAYERS,
} from '../Bg'

import type {
    Action as BgAction,
    BgLayer,
} from '../BgTypes.jsx'

const resetCacheLayers = () => ({
    type: RESET_CACHE_LAYERS,
})

const updateIsDreamscaping = isDreamscaping => ({
    type: UPDATE_IS_DREAMSCAPING,
    isDreamscaping,
})

const translateXLayersBgs = progress => ({
    type: TRANSLATE_X_LAYERS_BGS,
    progress,
})

const updateCacheLayers = (cacheLayers: Array<BgLayer>): BgAction => ({
    type: UPDATE_CACHE_LAYERS,
    cacheLayers,
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

const updateAllLayersUrl = (url: string): BgAction => ({
    type: UPDATE_ALL_LAYERS_URL,
    url,
})

export {
    updateTransitionProgress,
    updateFrontLayers,
    updateBackLayers,
    updateCacheLayers,
    updateIsDreamscaping,
    translateXLayersBgs,
    updateAllLayersUrl,
    resetCacheLayers,
}
