// @flow

import {initialState} from "../../store.js";

import type {MenuInput, MenuSectionState} from "../pages/types.jsx";

import type {AppThemeStyles} from "../../constantTypes.jsx";
import type {LinkState} from "../../reducer/SidebarTypes.jsx";
import type {ILink} from "../pages/types.jsx";

export type ReduxState = {
  isSidebarOpened: typeof initialState.sidebarReducer.isSidebarOpened,
  linkStates: typeof initialState.sidebarReducer.linkStates,
  linePosition: typeof initialState.appReducer.linePosition,
  headerIntersection: typeof initialState.headerReducer.sidebarIntersection,
  routing: typeof initialState.routing,
  appTheme: typeof initialState.appReducer.appTheme,
};

export type ReduxDispatch = {
  goTo: (page: string) => void,
  initLinkStates: (links: MenuInput) => void,
  toggleSection: (i: number) => void,
  toggleSubSection: (i: number, j: number) => void,
};

export type OwnProps = {};

export type State = {
  links: MenuInput,
};

export type Props = OwnProps & ReduxState & ReduxDispatch;

/**
   SidebarDumb
*/
export type SidebarDumbProps = Props & {
  themeStyles: AppThemeStyles,
  links: MenuInput,
};

/**
   SidebarSection
*/
export type SidebarSectionProps = SidebarDumbProps & {
  sectionState: LinkState,
  isOpened: boolean,
  section: MenuSectionState,
  id: {section: number, subSection: number},
};

/**
   SidebarSubSection
*/
export type SidebarSubSectionProps = SidebarSectionProps & {
  subSection: ILink,
  id: {section: number, subSection: number},
};
