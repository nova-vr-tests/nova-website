import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress
} from '../../reducer/actions/Bg.js'

import store from '../../store.js'
const dispatch = store.dispatch

const transitions = { splitBackground: {} }

/*
    Updates the backgrounds between slides prior to the slide transition
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
**/
transitions.splitBackground.updateBackgroundUrls = (sign, pages, currentPage) => {
    const totalPages = pages.length

    const previousPage = currentPage - 1 < 0 ? 0 : currentPage - 1
    const nextPage = currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1

    const frontBgUrl = sign < 0 ? pages[currentPage].bgUrl : pages[nextPage].bgUrl
    const backBgUrl = sign < 0 ? pages[previousPage].bgUrl : pages[currentPage].bgUrl

    dispatch(updateFrontBgUrl(frontBgUrl))
    dispatch(updateBackBgUrl(backBgUrl))
}

/*
    Reset background styles so next transition appears smoothly
    - param sign {number} positive for next slide and negative for previous slide
**/
transitions.splitBackground.resetBackgroundStyles = (sign) => {
    if(sign > 0) {
        dispatch(updateFrontBgStyle({ opacity: 0 }))
        dispatch(updateTransitionProgress(0))
    } else if (sign < 0) {
        dispatch(updateFrontBgStyle({ opacity: 1 }))
        dispatch(updateTransitionProgress(100))
    }
}

/*
    Split background slid
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
 transition
**/
transitions.splitBackground.slideTransition = (sign, pages, currentPage, attachScrollEvent, detachScrollEvent) => {
    transitions.splitBackground.resetBackgroundStyles(sign)

    // Upgrade backgrounds
    transitions.splitBackground.updateBackgroundUrls(sign, pages, currentPage)

    // Detach scroll event
    detachScrollEvent()

    // Get target page
    const totalPages = pages.length

    // boundary condition
    const targetPage = sign > 0 ?
                        (currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1)
                        :
                        currentPage

    // boundary condition: don't animate backgrounds when going back on first page and going forward on last page
    if((sign < 0 && currentPage <= 0) || (sign > 0 && currentPage >= totalPages - 1))
        return attachScrollEvent()

    // Animation handle
    let transitionProgress = 0
    let transitionTimer = 0
    transitionTimer = window.setInterval(() => {
        const condition = sign > 0 ? currentPage > targetPage : currentPage < targetPage

        if(transitionProgress > 100) {
            ////// Stop animation

            // Attach scroll event to page change
            attachScrollEvent()

            // Clear interval
            window.clearInterval(transitionTimer)
            transitionTimer = undefined
        } else {
            ////// Continue scrolling

            // Call background controls
            if (sign > 0) {
                dispatch(updateFrontBgStyle({ opacity: transitionProgress / 100 * 2 }))
                dispatch(updateTransitionProgress(transitionProgress / 100 < 0.5 ? 0 :  (transitionProgress / 100 - 0.5) * 2))
            } else {
                dispatch(updateFrontBgStyle({ opacity: transitionProgress < 50 ? 1 : 1 - (transitionProgress / 100 - 0.5) * 2 }))
                dispatch(updateTransitionProgress(1 - transitionProgress / 100 < 0.5 ? 0 :  (1 - transitionProgress / 100 - 0.5) * 2))
            }

            // Increment transition progress
            transitionProgress = transitionProgress + 1
        }
    }, 5)
}


export default transitions
