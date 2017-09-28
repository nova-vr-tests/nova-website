import {
    UPDATE_FRONT_BG_URL,
    UPDATE_FRONT_BG_STYLE,
    UPDATE_BACK_BG_URL,
    UPDATE_BACK_BG_STYLE,
    UPDATE_TRANSITION_PROGRESS,
    UPDATE_FRONT_BG_PARALAX,
    UPDATE_BACK_BG_PARALAX,
} from '../Bg'

const updateFrontBgParalax = paralax => ({
    type: UPDATE_FRONT_BG_PARALAX,
    paralax,
})

const updateBackBgParalax = paralax => ({
    type: UPDATE_BACK_BG_PARALAX,
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
}
