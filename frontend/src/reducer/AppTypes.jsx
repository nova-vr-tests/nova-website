// @flow
import type { ThemeNames as AppThemeTypes } from '../constantTypes.jsx'

/*
   State type
*/

type VoidFunc = (void) => void
export type State = {
    introKeyframe: number,
    isSidebarOpened: boolean,
    linePosition: number,
    appTheme: AppThemeTypes,
    currentPage: number,
    windowWidth: number,
    isFooterOpened: boolean,
    goToPage: VoidFunc,
}


/*
   Actions types
*/

export type UpdateIsFooterOpenedAction = {
    type: 'footer/update_is_footer_opened',
    isFooterOpened: boolean,
}

export type UpdateWindowWidthAction = {
    type: 'app/update_window_width',
    windowWidth: number,
}

export type UpdateGoToPageAction = {
    type: 'app/update_go_to_page',
    goToPage: VoidFunc,
}

export type UpdateCurrentPageAction = {
    type: 'app/update_current_page',
    currentPage: number,
}

export type UpdateThemeAction = {
    type: 'app/update_app_theme',
    appTheme: AppThemeTypes,
}

export type UpdateLinePositionAction = {
    type: 'app/update_line_position',
    linePosition: number,
}

export type IncrementIntrokeyframeAction = {|
    type: 'app/increment_intro_keyframe',
|}

export type ResetIntroKeyframeAction = {|
    type: 'app/reset_intro_keyframe',
|}
export type ToggleSidebarAction = {|
    type: 'app/toggle_sidebar',
|}

export type Action =  UpdateIsFooterOpenedAction
    | UpdateWindowWidthAction
    | UpdateGoToPageAction
    | UpdateCurrentPageAction
    | UpdateThemeAction
    | UpdateLinePositionAction
    | UpdateLinePositionAction
    | IncrementIntrokeyframeAction
    | ResetIntroKeyframeAction
    | ToggleSidebarAction
