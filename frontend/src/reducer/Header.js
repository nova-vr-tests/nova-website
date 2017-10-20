// @flow

export const  UPDATE_SIDEBAR_INTERSECTION = 'header/update_sidebar_intersection'
export type UpdateSidebarIntersection = {
    type: 'header/update_sidebar_intersection',
    sidebarIntersection: number,
}

export type Action = UpdateSidebarIntersection

export type State = {
    sidebarIntersection: number,
}

const initialState = {
    sidebarIntersection: 0,
}

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case UPDATE_SIDEBAR_INTERSECTION:
            return {
                ...state,
                sidebarIntersection: action.sidebarIntersection,
            }
        default:
            return state
    }
}
