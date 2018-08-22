import {UPDATE_SIDEBAR_INTERSECTION} from "../Header";

import type {Action as HeaderAction} from "../HeaderTypes.jsx";

const updateSidebarIntersection = (
  sidebarIntersection: number,
): HeaderAction => ({
  type: UPDATE_SIDEBAR_INTERSECTION,
  sidebarIntersection,
});

export {updateSidebarIntersection};
