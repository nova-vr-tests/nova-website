// @flow
import {styles} from "../constants.js";

import type {State, Action} from "./SidebarTypes.jsx";

export const TOGGLE_SIDEBAR = "sidebar/toggle_sidebar";

export const CREATE_SIDEBAR_STATE = "sidebar/create_sidebar_state";

export const TOGGLE_SIDEBAR_SECTION = "sidebar/toggle_sidebar_section";

export const TOGGLE_SIDEBAR_SUBSECTION = "sidebar/toggle_sidebar_subsection";

export const initialState = {
  isSidebarOpened: window.innerWidth < styles.mediaQueries.phone ? false : true,
  linkStates: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened,
      };
    case CREATE_SIDEBAR_STATE:
      return {
        ...state,
        linkStates: action.linkStates,
      };
    case TOGGLE_SIDEBAR_SECTION:
      return {
        ...state,
        linkStates: action.linkStates,
      };
    case TOGGLE_SIDEBAR_SUBSECTION:
      return {
        ...state,
        linkStates: action.linkStates,
      };
    default:
      return state;
  }
};
