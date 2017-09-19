export const INCREMENT_INTRO_KEYFRAME = 'app/increment intro keyframe'
export const RESET_INTRO_KEYFRAME = 'app/reset intro keyframe'
export const TOGGLE_SIDEBAR = 'app/toggle sidebar'
export const UPDATE_LINE_POSITION = 'app/update_line_position'

export const sectionPosition = {
    // values are position in sidebar links section array
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
}

const initialState = {
  introKeyframe: 1,
  isSidebarOpened: true,
  linePosition: 2, // position of current page in sidebar tree
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LINE_POSITION:
        return {
            ...state,
            linePosition: action.linePosition,
        }
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
