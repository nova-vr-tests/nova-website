// @flow
import type {State, Action} from "./HeaderTypes.jsx";

export const UPDATE_SIDEBAR_INTERSECTION = "header/update_sidebar_intersection";

export const initialState: State = {
  sidebarIntersection: 0,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_SIDEBAR_INTERSECTION:
      return {
        ...state,
        sidebarIntersection: action.sidebarIntersection,
      };
    default:
      return state;
  }
};
