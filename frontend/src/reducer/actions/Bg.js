import {
    UPDATE_FRONT_BG_URL,
    UPDATE_FRONT_BG_STYLE,
    UPDATE_BACK_BG_URL,
    UPDATE_BACK_BG_STYLE,
} from '../Bg'

const updateFrontBgUrl = url => ({
    type: UPDATE_FRONT_BG_URL,
    url,
})

const updateBackBgUrl = url => ({
    type: UPDATE_BACK_BG_URL,
    url
})

const updateFronBgStyle = style => ({
    type: UPDATE_FRONT_BG_STYLE,
    style,
})

const updateBackBgStyle = style => ({
    type:  UPDATE_BACK_BG_STYLE,
    style,
})

export {
    updateFronBgStyle,
    updateFrontBgUrl,
    updateBackBgStyle,
    updateBackBgUrl,
}
