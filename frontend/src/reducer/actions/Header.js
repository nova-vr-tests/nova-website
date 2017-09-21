import {
    UPDATE_SIDEBAR_INTERSECTION,
} from '../Header'

const updateSidebarIntersection = sidebarIntersection => ({
    type: UPDATE_SIDEBAR_INTERSECTION,
    sidebarIntersection,
})

export {
    updateSidebarIntersection,
}
