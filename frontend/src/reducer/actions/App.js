// @flow

import {
  UPDATE_SIDE_PANEL_HEADER_OVERRIDE,
  UPDATE_SIDE_PANEL_HEADER,
  UPDATE_LINE_POSITION,
  UPDATE_THEME,
  UPDATE_CURRENT_PAGE,
  UPDATE_GO_TO_PAGE,
  UPDATE_WINDOW_WIDTH,
  UPDATE_IS_FOOTER_OPENED,
  UPDATE_PAGES,
  UPDATE_CURRENT_FOOTER_PAGE,
  UPDATE_IS_SIDE_PANEL_OPENED,
  UPDATE_WINDOW_HEIGHT,
  UPDATE_MAIN_PANEL_CONTENT,
  UPDATE_MAIN_PANEL_IS_OPENED,
  UPDATE_IMG_VIEWER_URL,
  UPDATE_IMG_VIEWER_IS_OPENED,
} from "../App";

import {styles as appStyles} from "../../constants.js";

import type {Action as AppAction, GoToPage} from "../AppTypes.jsx";

import type {ThemeNames} from "../../constantTypes.jsx";

const updateImgViewerUrl = url => ({
  type: UPDATE_IMG_VIEWER_URL,
  url,
});

const updateImgViewerIsOpened = isOpened => ({
  type: UPDATE_IMG_VIEWER_IS_OPENED,
  isOpened,
});

const updateSidePanelHeaderOverride = overrideHeader => ({
  type: UPDATE_SIDE_PANEL_HEADER_OVERRIDE,
  overrideHeader,
});

const updateSidePanelHeader = header => ({
  type: UPDATE_SIDE_PANEL_HEADER,
  header,
});

const updateMainPanelIsOpened = isOpened => ({
  type: UPDATE_MAIN_PANEL_IS_OPENED,
  isOpened,
});

const updateMainPanelContent = content => ({
  type: UPDATE_MAIN_PANEL_CONTENT,
  content,
});

const updateWindowHeight = windowHeight => ({
  type: UPDATE_WINDOW_HEIGHT,
  windowHeight,
});

const updateIsSidePanelOpened = isSidePanelOpened => ({
  type: UPDATE_IS_SIDE_PANEL_OPENED,
  isSidePanelOpened,
});

const updatePages = pages => ({
  type: UPDATE_PAGES,
  pages,
});

const updateCurrentFooterPage = (currentFooterPage: number): AppAction => ({
  type: UPDATE_CURRENT_FOOTER_PAGE,
  currentFooterPage,
});

const updateIsFooterOpened = (isFooterOpened: boolean): AppAction => ({
  type: UPDATE_IS_FOOTER_OPENED,
  isFooterOpened,
});

const updateWindowWidth = (windowWidth: number): AppAction => ({
  type: UPDATE_WINDOW_WIDTH,
  windowWidth,
});

const updateGoToPage = (goToPage: GoToPage): AppAction => ({
  type: UPDATE_GO_TO_PAGE,
  goToPage,
});

const updateCurrentPage = (currentPage: number): AppAction => ({
  type: UPDATE_CURRENT_PAGE,
  currentPage,
});

const updateAppTheme = (
  appTheme: ThemeNames = appStyles.themeTypes.defaultTheme,
): AppAction => ({
  type: UPDATE_THEME,
  appTheme,
});

const updateLinePosition = (linePosition: number): AppAction => ({
  type: UPDATE_LINE_POSITION,
  linePosition,
});

// Flow doesn't distinguish AppAction case if type is from file import
const toggleSidebar = (): AppAction => ({
  type: "app/toggle_sidebar",
});

// Flow doesn't distinguish AppAction case if type is from file import
const incrementIntroKeyframe = (): AppAction => ({
  type: "app/increment_intro_keyframe",
});

// Flow doesn't distinguish AppAction case if type is from file import
const resetIntroKeyframe = (): AppAction => ({
  type: "app/reset_intro_keyframe",
});

export {
  incrementIntroKeyframe,
  resetIntroKeyframe,
  toggleSidebar,
  updateLinePosition,
  updateAppTheme,
  updateCurrentPage,
  updateGoToPage,
  updateWindowWidth,
  updateIsFooterOpened,
  updateCurrentFooterPage,
  updatePages,
  updateIsSidePanelOpened,
  updateWindowHeight,
  updateMainPanelContent,
  updateMainPanelIsOpened,
  updateSidePanelHeader,
  updateSidePanelHeaderOverride,
  updateImgViewerUrl,
  updateImgViewerIsOpened,
};
