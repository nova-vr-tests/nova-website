export const UPDATE_FRONT_BG_URL = 'bg/update_front_bg_url'
export const UPDATE_FRONT_BG_STYLE = 'bg/update_front_bg_style'
export const UPDATE_BACK_BG_URL = 'bg/update_back_bg_url'
export const UPDATE_BACK_BG_STYLE = 'bg/update_back_bg_style'

const initialState = {
    fronBg: {
        url: '',
        style: {},
    },
    backBg: {
        url: '',
        style: {},
    },
}

export default (state = initialState, action) => {
  switch (action.type) {
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
