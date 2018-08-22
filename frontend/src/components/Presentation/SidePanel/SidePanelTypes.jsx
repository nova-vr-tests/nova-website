// @flow

import * as React from "react";

import {initialState} from "../../../store.js";

export type ReduxState = {
  linePosition: typeof initialState.appReducer.linePosition,
  isFooterOpened: typeof initialState.appReducer.isFooterOpened,
  windowHeight: typeof initialState.appReducer.windowHeight,
  windowWidth: typeof initialState.appReducer.windowWidth,
  appTheme: typeof initialState.appReducer.appTheme,
};

export type ReduxDispatch = {};

export type OwnProps = {
  children: React.Node,
  type: number,
};

export type SmartCompProps = {
  isOpened: boolean,
  width: number,
  setWidth: number => void,
  setIsOpened: boolean => void,
  marginTop: string | number,
};

export type Props = OwnProps & SmartCompProps & ReduxState & ReduxDispatch;

/**
    BG
*/

export type BgProps = {
  widthCoef: number,
  type: number,
  windowHeight: number,
  rightEdgeCoef: number,
  bgColor: string,
  zIndex: number | string,
};
