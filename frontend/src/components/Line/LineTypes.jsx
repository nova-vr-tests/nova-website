// @flow

import * as React from "react";
import {initialState as state} from "../../store.js";

export type ReduxState = {
  linePosition: typeof state.appReducer.linePosition,
  appTheme: typeof state.appReducer.appTheme,
  windowWidth: typeof state.appReducer.windowWidth,
  isSidebarOpened: typeof state.sidebarReducer.isSidebarOpened,
};

export type ReduxDispatch = {};

export type OwnProps = {
  comp: React.Node,
};

export type Props = OwnProps & ReduxState & ReduxDispatch;
