import {
    UPDATE_FRONT_BG_URL,
    UPDATE_FRONT_BG_STYLE,
    UPDATE_BACK_BG_URL,
    UPDATE_BACK_BG_STYLE,
    UPDATE_TRANSITION_PROGRESS,
    UPDATE_FRONT_BG_PARALAX,
    UPDATE_BACK_BG_PARALAX,
    UPDATE_FRONT_LAYERS,
    UPDATE_BACK_LAYERS,
    UPDATE_CACHE_LAYERS,
} from '../Bg'

const updateCacheLayers = cacheLayers => ({
    type: UPDATE_CACHE_LAYERS,
    cacheLayers,
})

const updateFrontLayers = frontLayers => ({
    type: UPDATE_FRONT_LAYERS,
    frontLayers,
})
const updateBackLayers = backLayers => ({
    type: UPDATE_BACK_LAYERS,
    backLayers,
})

const updateBackBgParalax = paralax => ({
    type: UPDATE_BACK_BG_PARALAX,
    paralax,
})

const updateFrontBgParalax = paralax => ({
    type: UPDATE_FRONT_BG_PARALAX,
    paralax,
})

const updateTransitionProgress = transitionProgress => ({
    type: UPDATE_TRANSITION_PROGRESS,
    transitionProgress,
})

const updateFrontBgUrl = url => ({
    type: UPDATE_FRONT_BG_URL,
    url,
})

const updateBackBgUrl = url => ({
    type: UPDATE_BACK_BG_URL,
    url
})

const updateFrontBgStyle = style => ({
    type: UPDATE_FRONT_BG_STYLE,
    style,
})

const updateBackBgStyle = style => ({
    type:  UPDATE_BACK_BG_STYLE,
    style,
})

export {
    updateFrontBgStyle,
    updateFrontBgUrl,
    updateBackBgStyle,
    updateBackBgUrl,
    updateTransitionProgress,
    updateBackBgParalax,
    updateFrontBgParalax,
    updateFrontLayers,
    updateBackLayers,
    updateCacheLayers,
}
