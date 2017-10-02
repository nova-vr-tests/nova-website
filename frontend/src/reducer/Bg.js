export const UPDATE_FRONT_BG_URL = 'bg/update_front_bg_url'
export const UPDATE_FRONT_BG_STYLE = 'bg/update_front_bg_style'
export const UPDATE_BACK_BG_URL = 'bg/update_back_bg_url'
export const UPDATE_BACK_BG_STYLE = 'bg/update_back_bg_style'
export const UPDATE_TRANSITION_PROGRESS = 'bg/update_transition_progress'
export const UPDATE_FRONT_BG_PARALAX = 'bg/update_front_bg_paralax'
export const UPDATE_BACK_BG_PARALAX = 'bg/update_back_bg_paralax'
export const UPDATE_FRONT_LAYERS = 'bg/update_front_layers'
export const UPDATE_BACK_LAYERS = 'bg/update_back_layers'

const initialState = {
    frontBg: {
        url: '',
        style: {},
        paralax: 0,
    },
    backBg: {
        url: '',
        style: {},
        paralax: 0,
    },
    frontLayers: [],
    backLayers: [],
    transitionProgress: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_BACK_LAYERS:
      return {
          ...state,
          backLayers: action.backLayers,
      }
  case UPDATE_FRONT_LAYERS:
      return {
          ...state,
          frontLayers: action.frontLayers,
      }
  case UPDATE_FRONT_BG_PARALAX:
      return {
          ...state,
          frontBg: {
              ...state.frontBg,
              paralax: action.paralax,
          },
      }
  case UPDATE_BACK_BG_PARALAX:
      return {
          ...state,
          backBg: {
              ...state.backBg,
              paralax: action.paralax,
          },
      }
  case UPDATE_TRANSITION_PROGRESS:
      return {
          ...state,
          transitionProgress: action.transitionProgress,
      }
      case UPDATE_FRONT_BG_URL:
        return {
            ...state,
            frontBg: {
                ...state.frontBg,
                url: action.url,
            },
        }
  case UPDATE_FRONT_BG_STYLE:
      return {
          ...state,
          frontBg: {
              ...state.frontBg,
              style: action.style,
          },
      }
      case UPDATE_BACK_BG_URL:
          return {
              ...state,
              backBg: {
                  ...state.backBg,
                  url: action.url,
              },
          }
      case UPDATE_BACK_BG_STYLE:
          return {
              ...state,
              backBg: {
                  ...state.backBg,
                  style: action.style,
              },
          }
        default:
            return state
    }
}
