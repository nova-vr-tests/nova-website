import {
    UPDATE_SIDEBAR_INTERSECTION,
} from '../Header'

import type {
    Action as HeaderAction,
} from '../Header.js'

const updateSidebarIntersection = (sidebarIntersection: number): HeaderAction => ({
    type: UPDATE_SIDEBAR_INTERSECTION,
    sidebarIntersection,
})

export {
    updateSidebarIntersection,
}
