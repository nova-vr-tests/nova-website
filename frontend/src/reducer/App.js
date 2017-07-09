export const INCREMENT_INTRO_KEYFRAME = 'app/increment intro keyframe'
export const RESET_INTRO_KEYFRAME = 'app/reset intro keyframe'

const initialState = {
  introKeyframe: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
      case INCREMENT_INTRO_KEYFRAME:
        return {
            ...state,
            introKeyframe: state.introKeyframe + 1,
        }
    case RESET_INTRO_KEYFRAME:
        return {
            ...state,
            introKeyframe: initialState.introKeyframe,
        }
    default:
        return state
  }
}