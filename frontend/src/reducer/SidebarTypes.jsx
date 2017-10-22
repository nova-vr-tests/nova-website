// @flow

/**
   State type
*/
export type LinkState = {
    isOpened: boolean,
    subSections: Array<boolean>,
}

export type State = {
    isSidebarOpened: boolean,
    linkStates: Array<LinkState>
}


/**
   Action types
*/
export type ToggleSidebar = {|
    type: 'sidebar/toggle_sidebar',
|}

export type CreateSidebarState = {
    type: 'sidebar/create_sidebar_state',
    linkStates: Array<LinkState>,
}

export type ToggleSidebarSection = {
    type: 'sidebar/toggle_sidebar_section',
    linkStates: Array<LinkState>,
}

export type ToggleSidebarSubsection = {
    type: 'sidebar/toggle_sidebar_subsection',
    linkStates: Array<LinkState>,
}

export type Action = ToggleSidebar
    | CreateSidebarState
    | ToggleSidebarSection
    | ToggleSidebarSubsection

