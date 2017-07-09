import {
    INCREMENT_INTRO_KEYFRAME,
    RESET_INTRO_KEYFRAME,
    TOGGLE_SIDEBAR,
} from '../App'


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
}