// @flow

import {initialState} from "../../store.js";

export type ReduxState = {
  windowWidth: typeof initialState.appReducer.windowWidth,
  windowHeight: typeof initialState.appReducer.windowHeight,
};

export type ReduxDispatch = {};

export type OwnProps = {
  url: string,
  onRef: (?HTMLCanvasElement) => ?HTMLCanvasElement,
  getRef: void => ?HTMLCanvasElement,
};

export type Props = OwnProps & ReduxState & ReduxDispatch;

export type State = {};
