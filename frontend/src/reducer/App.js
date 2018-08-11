// @flow
import React from 'react'

import { styles as appStyles } from '../constants.js'
import type {
    State,
    Action,
} from './AppTypes.jsx'

export const sectionPosition = {
    // values are position in sidebar links section array
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
}

export const footerPage = {
    LEGALS: 1,
    CONTACT: 2,
    LOGIN: 3,
    BUILDXR: 4,
}

export const initialState: State = {
    appTheme: appStyles.themeTypes.defaultTheme,
    currentPage: 0,
    currentFooterPage: footerPage.LEGALS,
    goToPage: () => {},
    introKeyframe: 2,
    isFooterOpened: false,
    isSidebarOpened: true,
    isSidePanelOpened: true,
    linePosition: 2, // position of current page in sidebar tree
    pages: [], // site pages
    windowWidth: window.innerWidth, // number
    windowHeight: window.innherHeight, // number
    sidePanel: {
        header: () => <div></div>,
        overrideHeader: false,
    },
    mainPanel: {
        isOpened: false,
        content: () => <div></div>,
    },
    imgViewer: {
        isOpened: false,
        url: '',
    },
}


export const UPDATE_SIDE_PANEL_HEADER_OVERRIDE = 'side panel/update header override'
export const UPDATE_IS_SIDE_PANEL_OPENED = 'side panel/is_side_panel_opened'
export const UPDATE_IS_FOOTER_OPENED = 'footer/update_is_footer_opened'
export const UPDATE_WINDOW_WIDTH = 'app/update_window_width'
export const UPDATE_GO_TO_PAGE = 'app/update_go_to_page'
export const UPDATE_CURRENT_PAGE = 'app/update_current_page'
export const UPDATE_CURRENT_FOOTER_PAGE = 'app/update_current_footer_page'
export const UPDATE_THEME = 'app/update_app_theme'
export const UPDATE_LINE_POSITION = 'app/update_line_position'
export const INCREMENT_INTRO_KEYFRAME = 'app/increment_intro_keyframe'
export const RESET_INTRO_KEYFRAME = 'app/reset_intro_keyframe'
export const TOGGLE_SIDEBAR = 'app/toggle_sidebar'
export const UPDATE_PAGES = 'app/update_pages'
export const UPDATE_WINDOW_HEIGHT = 'app/update_window_height'
export const UPDATE_MAIN_PANEL_IS_OPENED = 'app/update_main_panel_is_opened'
export const UPDATE_MAIN_PANEL_CONTENT = 'app/update_mains_panel_content'
export const UPDATE_SIDE_PANEL_HEADER = 'app/update side panel header'
export const UPDATE_IMG_VIEWER_URL = 'app/update img viewer url'
export const UPDATE_IMG_VIEWER_IS_OPENED = 'app/update img viewer is opened'


export default (state: State = initialState, action: Action): State => {
  const { openedFooterTheme } = appStyles.themeTypes

  switch (action.type) {
  case UPDATE_IMG_VIEWER_URL:
      return {
          ...state,
          imgViewer: {
            url: action.url,
            isOpened: true,
          }
      }
  case UPDATE_IMG_VIEWER_IS_OPENED:
      return {
          ...state,
          imgViewer: {
              ...state.imgViewer,
              isOpened: action.isOpened,
          }
      }
  case UPDATE_SIDE_PANEL_HEADER_OVERRIDE:
      return {
          ...state,
          sidePanel: {
              ...state.sidePanel,
              overrideHeader: action.overrideHeader,
          }
      }
  case UPDATE_SIDE_PANEL_HEADER:
      return {
          ...state,
          sidePanel: {
              ...state.sidePanel,
              header: action.header,
          }
      }
  case UPDATE_MAIN_PANEL_IS_OPENED:
      return {
          ...state,
          mainPanel: {
              ...state.mainPanel,
              isOpened: action.isOpened,
          }
      }
  case UPDATE_MAIN_PANEL_CONTENT :
    return {
        ...state,
        mainPanel: {
            ...state.mainPanel,
            content: action.content,
        }
    }
  case UPDATE_WINDOW_HEIGHT:
      return {
          ...state,
          windowHeight: action.windowHeight,
      }
  case UPDATE_IS_SIDE_PANEL_OPENED:
      return {
          ...state,
          isSidePanelOpened: action.isSidePanelOpened
      }
  case UPDATE_PAGES:
      return {
          ...state,
          pages: action.pages,
      }
  case UPDATE_CURRENT_FOOTER_PAGE:
      return {
          ...state,
          currentFooterPage: action.currentFooterPage,
      }
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

