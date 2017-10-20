// @flow
import {
    styles,
} from '../constants.js'

export type LinkState = {
    isOpened: boolean,
    subSections: Array<boolean>,
}

export const TOGGLE_SIDEBAR = 'sidebar/toggle_sidebar'
type ToggleSidebar = {|
    type: 'sidebar/toggle_sidebar',
|}

export const CREATE_SIDEBAR_STATE = 'sidebar/create_sidebar_state'
type CreateSidebarState = {
    type: 'sidebar/create_sidebar_state',
    linkStates: Array<LinkState>,
}

export const TOGGLE_SIDEBAR_SECTION = 'sidebar/toggle_sidebar_section'
export type ToggleSidebarSection = {
    type: 'sidebar/toggle_sidebar_section',
    linkStates: Array<LinkState>,
}

export const TOGGLE_SIDEBAR_SUBSECTION = 'sidebar/toggle_sidebar_subsection'
export type ToggleSidebarSubsection = {
    type: 'sidebar/toggle_sidebar_subsection',
    linkStates: Array<LinkState>,
}

export type Action = ToggleSidebar
    | CreateSidebarState
    | ToggleSidebarSection
    | ToggleSidebarSubsection

export type State = {
    isSidebarOpened: boolean,
    linkStates: Array<LinkState>
}

const initialState = {
    isSidebarOpened: window.innerWidth < styles.mediaQueries.phone ? false : true,
    linkStates: [],
}

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: !state.isSidebarOpened,
            }
        case CREATE_SIDEBAR_STATE:
            return {
                ...state,
                linkStates: action.linkStates,
            }
        case TOGGLE_SIDEBAR_SECTION:
            return {
                ...state,
                linkStates: action.linkStates
            }
        case TOGGLE_SIDEBAR_SUBSECTION:
            return {
                ...state,
                linkStates: action.linkStates
            }
        default:
            return state
    }
}
