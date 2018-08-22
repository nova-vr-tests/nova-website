// @flow

/**
   State type
*/
export type State = {
  sidebarIntersection: number,
};

/**
   Action types
*/
export type UpdateSidebarIntersection = {
  type: "header/update_sidebar_intersection",
  sidebarIntersection: number,
};

export type Action = UpdateSidebarIntersection;
