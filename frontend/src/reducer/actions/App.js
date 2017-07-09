import { INCREMENT_INTRO_KEYFRAME, RESET_INTRO_KEYFRAME } from '../App'

const incrementIntroKeyframe = () => ({
    type: INCREMENT_INTRO_KEYFRAME
})

const resetIntroKeyframe = () => ({
    type: RESET_INTRO_KEYFRAME
})

export {
    incrementIntroKeyframe,
    resetIntroKeyframe,
}