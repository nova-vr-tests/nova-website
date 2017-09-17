import {
    TOGGLE_SIDEBAR,
    CREATE_SIDEBAR_STATE,
    TOGGLE_SIDEBAR_SECTION,
    TOGGLE_SIDEBAR_SUBSECTION,
} from '../Sidebar'

import store from '../../store.js'

const initSidebarLinkStates = sections => {
    const sidebarState = []

    for(let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const subSections = section.links

        sidebarState[i] = {
            isOpened: false,
            subSections: [],
        }

        for(let j = 0; j < subSections.length; j++) {
            const subSection = subSections[j]
            const subSubSections = subSection.links

            sidebarState[i].subSections[j] = false
        }
    }

    return {
        type: CREATE_SIDEBAR_STATE,
        linkStates: sidebarState,
    }
}

const toggleSidebarSection = i => {
    const linkStates = { ...store.getState().sidebarReducer.linkStates }

    linkStates[i].isOpened = !linkStates[i].isOpened

    return {
        type: TOGGLE_SIDEBAR_SECTION,
        linkStates,
    }
}

const toggleSidebarSubSection = (i, j) => {
    const linkStates = { ...store.getState().sidebarReducer.linkStates }

    linkStates[i].subSections[j] = !linkStates[i].subSections[j]

    return {
        type: TOGGLE_SIDEBAR_SUBSECTION,
        linkStates,
    }
}

const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
})

export {
    toggleSidebar,
    initSidebarLinkStates,
    toggleSidebarSection,
    toggleSidebarSubSection,
}
