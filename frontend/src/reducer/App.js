// @flow

import { styles as appStyles } from '../constants.js'
export const INCREMENT_INTRO_KEYFRAME = 'app/increment_intro_keyframe'
export const RESET_INTRO_KEYFRAME = 'app/reset_intro_keyframe'
export const TOGGLE_SIDEBAR = 'app/toggle_sidebar'
export const UPDATE_LINE_POSITION = 'app/update_line_position'
export const UPDATE_BG = 'app/update_bg'
export const UPDATE_THEME = 'app/update_app_theme'
export const UPDATE_CURRENT_PAGE = 'app/update_current_page'
export const UPDATE_GO_TO_PAGE = 'app/update_go_to_page'
export const UPDATE_WINDOW_WIDTH = 'app/update_window_width'
export const UPDATE_IS_FOOTER_OPENED = 'footer/update_is_footer_opened'

export const sectionPosition = {
    // values are position in sidebar links section array
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
}


type VoidFunc = (void) => void
type State = {
    introKeyframe: number,
    isSidebarOpened: boolean,
    linePosition: number,
    bgUrl: string,
    appTheme: string,
    currentPage: number,
    windowWidth: number,
    isFooterOpened: boolean,
    goToPage: VoidFunc,
}

const initialState: State = {
    introKeyframe: 2,
    isSidebarOpened: true,
    linePosition: 2, // position of current page in sidebar tree
    bgUrl: '',
    appTheme: appStyles.themeTypes.defaultTheme,
    currentPage: 0,
    goToPage: () => {},
    windowWidth: window.innerWidth, // number
    isFooterOpened: false,
}

type UpdateIsFooterOpenedAction = {
    type: 'footer/update_is_footer_opened',
    isFooterOpened: boolean,
}

type UpdateWindowWidthAction = {
    type: 'app/reset_intro_keyframe',
    windowWidth: number,
}

type UpdateGoToPageAction = {
    type: 'app/update_go_to_page',
    goToPage: VoidFunc,
}

type UpdateCurrentPageAction = {
    type: 'app/update_current_page',
    currentPage: number,
}

type UpdateThemeAction = {
    type: 'app/update_app_theme',
    appTheme: string,
}

type UpdateBgAction = {
    type: 'app/update_bg',
    bgUrl: string,
}

type UpdateLinePositionAction = {
    type: 'app/update_line_position',
    linePosition: number,
}

type IncrementIntrokeyframeAction = {
    type: 'app/increment_intro_keyframe',
    introKeyframe: number,
}

type ResetIntroKeyframeAction = {
    type: 'app/reset_intro_keyframe',
}

type ToggleSidebarAction = {
    type: 'app/toggle_sidebar',
}

type Action =  UpdateIsFooterOpenedAction
    | UpdateWindowWidthAction
    | UpdateGoToPageAction
    | UpdateCurrentPageAction
    | UpdateThemeAction
    | UpdateBgAction
    | UpdateLinePositionAction
    | UpdateLinePositionAction
    | IncrementIntrokeyframeAction
    | ResetIntroKeyframeAction
    | ToggleSidebarAction


export default (state: State = initialState, action: Action): State => {
  const { openedFooterTheme } = appStyles.themeTypes

  switch (action.type) {
  case UPDATE_IS_FOOTER_OPENED:
      return {
          ...state,
          appTheme: action.isFooterOpened ? openedFooterTheme : state.appTheme,
          isFooterOpened: action.isFooterOpened,
      }
  case UPDATE_WINDOW_WIDTH:
      return {
          ...state,
          windowWidth: action.windowWidth,
      }
  case UPDATE_GO_TO_PAGE:
      return {
          ...state,
          goToPage: action.goToPage,
      }
  case UPDATE_CURRENT_PAGE:
      return {
          ...state,
          currentPage: action.currentPage,
      }
  case UPDATE_THEME:
      return {
          ...state,
          appTheme: action.appTheme
      }
  case UPDATE_BG:
      return {
          ...state,
          bgUrl: action.bgUrl,
      }
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

