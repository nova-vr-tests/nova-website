export const TOGGLE_SIDEBAR = 'sidebar/toggle sidebar'
export const CREATE_SIDEBAR_STATE = 'sidebar/create_sidebar_state'
export const TOGGLE_SIDEBAR_SECTION = 'sidebar/toggle_sidebar_section'
export const TOGGLE_SIDEBAR_SUBSECTION = 'sidebar/toggle_sidebar_subsection'

const initialState = {
    isSidebarOpened: true,
    linkStates: [],
}

export default (state = initialState, action) => {
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
