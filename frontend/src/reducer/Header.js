export const  UPDATE_SIDEBAR_INTERSECTION = 'header/update_sidebar_intersection'

const initialState = {
    sidebarIntersection: 0,
}

export default (state = initialState, action) => {
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
