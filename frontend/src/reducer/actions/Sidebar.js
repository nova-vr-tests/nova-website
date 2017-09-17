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

const resetLinkStates = _links => {
    const links = [ ..._links ]
    for(let i = 0; i < links.length; i++) {
        links[i].isOpened = false

        for(let j = 0; j < links[i].subSections.length; j++) {
            links[i].subSections[j] = false
        }
    }

    return links
}

const toggleSidebarSection = i => {
    const currentLinkStates = [ ...store.getState().sidebarReducer.linkStates ]
    const linkStates = resetLinkStates(currentLinkStates)

    linkStates[i].isOpened = !currentLinkStates[i].isOpened

    return {
        type: TOGGLE_SIDEBAR_SECTION,
        linkStates,
    }
}

const toggleSidebarSubSection = (i, j) => {
    const currentLinkStates = [ ...store.getState().sidebarReducer.linkStates ]
    const linkStates = resetLinkStates(currentLinkStates)

    linkStates[i].isOpened = !currentLinkStates[i].isOpened
    linkStates[i].subSections[j] = !currentLinkStates[i].subSections[j]

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
