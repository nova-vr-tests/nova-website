import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress,
    updateFrontBgParalax,
    updateBackBgParalax,
} from '../../reducer/actions/Bg.js'

import store from '../../store.js'
const dispatch = store.dispatch

const transitions = { splitBackground: {}, bgParalax: {} }

const inverseParalax = () => {
    const { frontBg, backBg } = store.getState().bgReducer

    dispatch(updateFrontBgParalax(backBg.paralax))
    dispatch(updateBackBgParalax(frontBg.paralax))
}

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

        dispatch(updateFrontBgParalax(0))
        dispatch(updateBackBgParalax(0))
    } else if (sign < 0) {
        dispatch(updateFrontBgStyle({ opacity: 1 }))
        dispatch(updateTransitionProgress(100))

        dispatch(updateFrontBgParalax(0))
        dispatch(updateBackBgParalax(0))
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
                        currentPage - 1

    // boundary condition: don't animate backgrounds when going back on first page and going forward on last page
    if((sign < 0 && currentPage <= 0) || (sign > 0 && currentPage >= totalPages - 1))
        return attachScrollEvent()

    // Init paralax (to be refactored into single function)
    if(sign > 0) {
        // sign > 0 => back background is current page
        //          => front background is next page

    } else if(sign < 0) {
        // sign < 0 => back background is previous page
        //          => front bg is current page

        dispatch(updateBackBgParalax(-pages[targetPage].paralax))
        dispatch(updateFrontBgParalax(pages[currentPage].paralax))
    }

    // Animation handle
    let transitionProgress = 0
    let transitionTimer = 0
    transitionTimer = window.setInterval(() => {

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

transitions.types = {
    BG_PARALAX: 0,
    BG_SPLIT: 1,
}


const translateFrontBg = (progress, deltaX) => {
    dispatch(updateFrontBgParalax(-progress / 100 * deltaX))
}

const translateBackBg = (progress, deltaX) => {
    dispatch(updateBackBgParalax(-progress / 100 * deltaX))
}

transitions.bgParalax.slideTransition = (sign, pages, currentPage, attachScrollEvent, detachScrollEvent) => {
    detachScrollEvent()

    const bgState = store.getState().bgReducer

    // Choose which bg to translate
    let translate = bgState.transitionProgress !== 0 ? translateFrontBg : translateBackBg
    console.log(bgState.transitionProgress)

    // Animation handle
    let transitionProgress = 0
    let transitionTimer = 0
    transitionTimer = window.setInterval(() => {
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
                translate(transitionProgress, 100)
            } else {
                translate(100-transitionProgress, 100)
            }

            // Increment transition progress
            transitionProgress = transitionProgress + 1
        }
    }, 5)
}

transitions.startTransition = (type, params) => {
    const { sign, pages, currentPage, attachScrollEvent, detachScrollEvent } = params
    const { BG_PARALAX, BG_SPLIT } = transitions.types

    switch(type){
        case BG_SPLIT:
            return transitions.splitBackground.slideTransition(sign, pages, currentPage, attachScrollEvent, detachScrollEvent)
        case BG_PARALAX:
            return transitions.bgParalax.slideTransition(sign, pages, currentPage, attachScrollEvent, detachScrollEvent)
            break
        default:
            return
    }
}


export default transitions
