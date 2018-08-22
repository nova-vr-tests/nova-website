// @flow

import {initialState} from "../../store.js";

export type SvgProps = {
  color: string,
  windowWidth: typeof initialState.appReducer.windowWidth,
  windowHeight: typeof initialState.appReducer.windowHeight,
};

export type ReduxState = {
  isSidebarOpened: typeof initialState.sidebarReducer.isSidebarOpened,
  appTheme: typeof initialState.appReducer.appTheme,
  isFooterOpened: typeof initialState.appReducer.isFooterOpened,
  windowWidth: typeof initialState.appReducer.windowWidth,
  windowHeight: typeof initialState.appReducer.windowHeight,
  currentPath: typeof initialState.routing.location.pathname,
};

export type ReduxDispatch = {
  updateSidebarIntersection: (sidebarIntersection: number) => void,
  goTo: (url: string) => void,
  closeFooter: () => void,
};

export type OwnProps = {};

export type Props = OwnProps & ReduxState & ReduxDispatch;
