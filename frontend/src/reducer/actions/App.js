import {
    INCREMENT_INTRO_KEYFRAME,
    RESET_INTRO_KEYFRAME,
    TOGGLE_SIDEBAR,
    UPDATE_LINE_POSITION,
    UPDATE_BG,
    UPDATE_THEME,
    UPDATE_CURRENT_PAGE,
    UPDATE_GO_TO_PAGE,
    UPDATE_WINDOW_WIDTH,
} from '../App'

const updateWindowWidth = windowWidth => ({
    type: UPDATE_WINDOW_WIDTH,
    windowWidth,
})
const updateGoToPage = goToPage => ({
    type: UPDATE_GO_TO_PAGE,
    goToPage,
})

const updateCurrentPage = currentPage => ({
    type: UPDATE_CURRENT_PAGE,
    currentPage,
})

const updateAppTheme = appTheme => ({
    type: UPDATE_THEME,
    appTheme,
})

const updateBg = bgUrl => ({
    type: UPDATE_BG,
    bgUrl,
})

const updateLinePosition = linePosition => ({
    type: UPDATE_LINE_POSITION,
    linePosition,
})

const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
})
const incrementIntroKeyframe = () => ({
    type: INCREMENT_INTRO_KEYFRAME
})

const resetIntroKeyframe = () => ({
    type: RESET_INTRO_KEYFRAME
})

export {
    incrementIntroKeyframe,
    resetIntroKeyframe,
    toggleSidebar,
    updateLinePosition,
    updateBg,
    updateAppTheme,
    updateCurrentPage,
    updateGoToPage,
    updateWindowWidth,
}
