export const INCREMENT_INTRO_KEYFRAME = 'app/increment intro keyframe'
export const RESET_INTRO_KEYFRAME = 'app/reset intro keyframe'
export const TOGGLE_SIDEBAR = 'app/toggle sidebar'

const initialState = {
  introKeyframe: 1,
  isSidebarOpened: true,
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
    case TOGGLE_SIDEBAR:
        return {
            ...state,
            isSidebarOpened: !state.isSidebarOpened,
        }
    default:
        return state
  }
}