// @flow

import * as React from "react";

import {initialState} from "../../store.js";

import type {IBgLayer} from "../pages/types.jsx";

import type {ThemeNames} from "../../constantTypes.jsx";

import type {TransitionTypes} from "./transitionTypes.jsx";

// Data structure as input of Presentation comp
export type Page = {
  h1: string,
  h2: string,
  path: string,
  layers: Array<IBgLayer>,
  pid: Object, // Symbols not supported by flow
  linePosition: number,
  align: string,
  theme: ThemeNames,
  comp: React.StatelessFunctionalComponent<{}>,
  mainPanelContent: React.Component<{}>,
  overrideHeader: boolean,
  transitions: {
    nextSlide: {
      bg: TransitionTypes,
    },
    previousSlide: {
      bg: TransitionTypes,
    },
  },
};

export type ReduxState = {
  pathname: string,
  appTheme: typeof initialState.appReducer.appTheme,
  currentPage: typeof initialState.appReducer.currentPage,
  windowWidth: typeof initialState.appReducer.windowWidth,
  isFooterOpened: typeof initialState.appReducer.isFooterOpened,
  goToPage: typeof initialState.appReducer.goToPage,
  linePosition: typeof initialState.appReducer.linePosition,
  isSidePanelOpened: typeof initialState.appReducer.isSidePanelOpened,
  isMainPanelOpened: typeof initialState.appReducer.mainPanel.isOpened,
  mainPanelContent: typeof initialState.appReducer.mainPanel.content,
};

export type ReduxDispatch = {
  updateTransitionProgress: (
    p: typeof initialState.bgReducer.transitionProgress,
  ) => void,
  updateBackLayers: (
    l: typeof initialState.bgReducer.backLayers,
    pid: Object,
  ) => void,
  goTo: (url: string) => void,
  updateLinePosition: (p: typeof initialState.appReducer.linePosition) => void,
  updateAppTheme: (appTheme: typeof initialState.appReducer.appTheme) => void,
  updateCurrentPage: (
    currentPage: typeof initialState.appReducer.currentPage,
  ) => void,
  updateGoToPage: (goToPage: typeof initialState.appReducer.goToPage) => void,
  updatePages: (pages: Array<Page>) => void,
  updateMainPanelIsOpened: (isOpened: boolean) => void,
  updateMainPanelContent: (content: React.Component<{}>) => void,
  updateSidePanelHeaderOverride: (overrideHeader: boolean) => void,
};

type ScrollEvent = {};

export type OwnProps = {
  attachToMouseScroll: ?boolean,
  pages: Array<Page>,
  resetScrollEvent: void => void,
  scrollEvent: ?ScrollEvent,
};

export type Props = OwnProps & ReduxState & ReduxDispatch;

export type State = {
  scrollEvent: ?ScrollEvent,
};
