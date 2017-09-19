import {
    INCREMENT_INTRO_KEYFRAME,
    RESET_INTRO_KEYFRAME,
    TOGGLE_SIDEBAR,
    UPDATE_LINE_POSITION,
} from '../App'


const updateLinePosition = linePosition => ({
    type: UPDATE_LINE_POSITION,
    linePosition,
})

const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
})
const incrementIntroKeyframe = () => ({
    type: INCREMENT_INTRO_KEYFRAME
})

const resetIntroKeyframe = () => ({
    type: RESET_INTRO_KEYFRAME
})

export {
    incrementIntroKeyframe,
    resetIntroKeyframe,
    toggleSidebar,
    updateLinePosition,
}
