// @flow
import type {ThemeNames as AppThemeTypes} from "../constantTypes.jsx";
import * as React from "react";

/*
   State type
*/

export type GoToPage = (page: number) => void;
type MainPanel = {
  isOpened: boolean,
  content: React.ComponentType<any>,
};

type SidePanel = {
  overrideHeader: boolean,
  header: React.ComponentType<any>,
};

export type State = {
  introKeyframe: number,
  isSidebarOpened: boolean,
  linePosition: number,
  appTheme: AppThemeTypes,
  currentPage: number,
  windowWidth: number,
  windowHeight: number,
  isFooterOpened: boolean,
  goToPage: GoToPage,
  currentFooterPage: number,
  isSidePanelOpened: boolean,
  mainPanel: MainPanel,
  sidePanel: SidePanel,
  pages: Array<any>,
};

/*
   Actions types
*/

export type UpdateCurrentFooterPageAction = {
  type: "footer/update_current_footer_page",
  currentFooterPage: number,
};

export type UpdateIsFooterOpenedAction = {
  type: "footer/update_is_footer_opened",
  isFooterOpened: boolean,
};

export type UpdateWindowWidthAction = {
  type: "app/update_window_width",
  windowWidth: number,
};

export type UpdateGoToPageAction = {
  type: "app/update_go_to_page",
  goToPage: GoToPage,
};

export type UpdateCurrentPageAction = {
  type: "app/update_current_page",
  currentPage: number,
};

export type UpdateThemeAction = {
  type: "app/update_app_theme",
  appTheme: AppThemeTypes,
};

export type UpdateLinePositionAction = {
  type: "app/update_line_position",
  linePosition: number,
};

export type IncrementIntrokeyframeAction = {|
  type: "app/increment_intro_keyframe",
|};

export type ResetIntroKeyframeAction = {|
  type: "app/reset_intro_keyframe",
|};

export type ToggleSidebarAction = {|
  type: "app/toggle_sidebar",
|};

export type Action =
  | UpdateIsFooterOpenedAction
  | UpdateWindowWidthAction
  | UpdateGoToPageAction
  | UpdateCurrentPageAction
  | UpdateThemeAction
  | UpdateLinePositionAction
  | UpdateLinePositionAction
  | IncrementIntrokeyframeAction
  | ResetIntroKeyframeAction
  | ToggleSidebarAction
  | UpdateCurrentFooterPage;
