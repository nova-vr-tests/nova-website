// @flow

import {
    updateTransitionProgress,
    updateFrontLayers,
    updateBackLayers,
    updateCacheLayers,
    updateIsDreamscaping,
} from '../../reducer/actions/Bg.js'

import store from '../../store.js'

import type {
    Transitions,
    UpdateLayersOpacity,
    UpdateFronLayersOpacity,
    UpdateBg,
} from './transitionTypes.jsx'

const dispatch = store.dispatch

const transitionTypes = {
    NONE: -1,
    BG_PARALAX: 0,
    BG_SPLIT: 1,
}


/*
    Updates the backgrounds between slides prior to the slide transition
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
**/
const updateBackgroundLayers = (sign, pages, currentPage) => {
    const totalPages = pages.length

    const previousPage = currentPage - 1 < 0 ? 0 : currentPage - 1
    const nextPage = currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1

    const stateFrontLayersPid = store.getState().bgReducer.frontLayersPid
    let currentlyShownLayers
    if(pages[currentPage].pid === stateFrontLayersPid) {
        currentlyShownLayers = store.getState().bgReducer.frontLayers
    } else {
        currentlyShownLayers = store.getState().bgReducer.backLayers
    }


    const frontLayers = sign < 0 ? currentlyShownLayers : pages[nextPage].layers
    const backLayers = sign < 0 ? pages[previousPage].layers  : currentlyShownLayers
    const frontLayersPid = sign < 0 ? pages[currentPage].pid : pages[nextPage].pid
    const backLayersPid = sign < 0 ? pages[previousPage].pid : pages[currentPage].pid

    const frontLayers2 = sign > 0 ? transitions.splitBackground.resetBackgroundStyles(frontLayers, 0) : transitions.splitBackground.resetBackgroundStyles(frontLayers, 1)
    const backLayers2 = sign > 0 ? transitions.splitBackground.resetBackgroundStyles(backLayers, 0) : transitions.splitBackground.resetBackgroundStyles(backLayers, 1)

    const isBackLayerVisible = store.getState().bgReducer.transitionProgress < 0.9 ? true : false


    const currentSlideLayers = currentlyShownLayers
    const previousSlideLayers = pages[previousPage].layers
    const currentSlideLayersPid = pages[currentPage].pid
    const previousSlideLayersPid = pages[previousPage].pid

    const { resetBackgroundStyles } = transitions.splitBackground
    if(sign > 0) {
        if(isBackLayerVisible) {
            dispatch(updateCacheLayers(backLayers2, backLayersPid))
            dispatch(updateBackLayers(currentSlideLayers, currentSlideLayersPid))
        } else {
            dispatch(updateCacheLayers(resetBackgroundStyles(frontLayers, 1), frontLayersPid))
            dispatch(updateFrontLayers(frontLayers2, frontLayersPid))
            dispatch(updateBackLayers(backLayers, backLayersPid))
        }
    } else {
        if(!isBackLayerVisible) {
            // user currently sees front layer which we need to cache and pass to the back layer to split
            dispatch(updateCacheLayers(resetBackgroundStyles(currentSlideLayers, 1), currentSlideLayersPid))
            dispatch(updateBackLayers(previousSlideLayers, previousSlideLayersPid))
            dispatch(updateFrontLayers(resetBackgroundStyles(currentSlideLayers, 1), currentSlideLayersPid))
        } else {
            // user currently sees back layer which we need to move to the front layer and close back layer with previous slide over it
            dispatch(updateCacheLayers(updateLayersOpacity(currentSlideLayers, 1), currentSlideLayersPid))
            dispatch(updateFrontLayers(updateLayersOpacity(currentSlideLayers, 1), currentSlideLayersPid))
            dispatch(updateBackLayers(updateLayersOpacity(previousSlideLayers, 0), previousSlideLayersPid))
        }
    }

    window.setTimeout( () => {
        dispatch(updateCacheLayers([]))

        // Otherwise paralax goes back when splitting to next page on back layer
        if(sign < 0) {
            dispatch(updateBackLayers(updateLayersOpacity(previousSlideLayers, 1), previousSlideLayersPid))
        }
    }, 100)


    return { frontLayers, backLayers, frontLayersPid }
}

const updateLayersOpacity: UpdateLayersOpacity = (layers, opacity) => layers.map(e => ({
    ...e,
    opacity: e.opacity * opacity,
}))

/*
    Reset background styles so next transition appears smoothly
    - param sign {number} positive for next slide and negative for previous slide

**/
const resetBackgroundStyles = (layers, progress = 0) => {
    return layers.map(e => ({
        ...e,
        opacity: e.opacity * progress,
    }))

}

const updateFrontLayersOpacity: UpdateFronLayersOpacity = (layers, progress, layersPid) => {
    const targetLayers = layers.map(e => ({
        ...e,
        opacity: e.opacity * progress,
    }))

    dispatch(updateFrontLayers(targetLayers, layersPid))
}

/*
    Split background slid
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
 transition
**/
const slideTransition = (sign, pages, currentPage, attachScrollEvent, detachScrollEvent) => {
    // update isDreamscaping to true
    dispatch(updateIsDreamscaping(true))


    // Upgrade backgrounds
    const { frontLayers, frontLayersPid } = transitions.splitBackground.updateBackgroundLayers(sign, pages, currentPage)

    // transitions.splitBackground.resetBackgroundStyles(sign)
    // updateFrontLayersOpacity(0)

    // Detach scroll event
    detachScrollEvent()

    // Get target page
    const totalPages = pages.length


    // boundary condition: don't animate backgrounds when going back on first page and going forward on last page
    if((sign < 0 && currentPage <= 0) || (sign > 0 && currentPage >= totalPages - 1)) {
        return attachScrollEvent()
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

            // set isdreamscaping to false
            dispatch(updateIsDreamscaping(false))

        } else {
            ////// Continue scrolling

            // Call background controls
            if (sign > 0) {
                updateFrontLayersOpacity(frontLayers, transitionProgress / 100 * 2, frontLayersPid)

                dispatch(updateTransitionProgress(transitionProgress / 100 < 0.5 ? 0 :  (transitionProgress / 100 - 0.5) * 2))
            } else {
                updateFrontLayersOpacity(frontLayers, transitionProgress < 50 ? 1 : 1 - (transitionProgress / 100 - 0.5) * 2, frontLayersPid)

                dispatch(updateTransitionProgress(1 - transitionProgress / 100 < 0.5 ? 0 :  (1 - transitionProgress / 100 - 0.5) * 2))
            }

            // Increment transition progress
            transitionProgress = transitionProgress + 1
        }
    }, 5)
}



const updateFrontBg: UpdateBg = (progress, pages, currentPage, targetPage) => {
    const currentLayers = pages[currentPage].layers
    const currentLayersPid = pages[currentPage].pid
    const targetLayers = pages[targetPage].layers

    const updatedLayers = currentLayers.map((layer, i) => {
        let deltaParalax = targetLayers[i].paralax - currentLayers[i].paralax
        let deltaOpacity = targetLayers[i].opacity - currentLayers[i].opacity

        let paralax = currentLayers[i].paralax + deltaParalax * progress / 100
        let opacity = currentLayers[i].opacity + deltaOpacity * progress / 100

        if(targetPage < currentPage) {
            paralax = targetLayers[i].paralax - (1 - progress / 100) * deltaParalax
            opacity = targetLayers[i].opacity - (1 - progress / 100) * deltaOpacity
        }

        return {
            ...layer,
            paralax,
            opacity,
        }
    })

    dispatch(updateFrontLayers(updatedLayers), currentLayersPid)
}

const updateBackBg: UpdateBg = (progress, pages, currentPage, targetPage) => {
    const currentLayers = pages[currentPage].layers
    const currentLayersPid = pages[currentPage].pid
    const targetLayers = pages[targetPage].layers

    const updatedLayers = currentLayers.map((layer, i) => {
        let deltaParalax = targetLayers[i].paralax - currentLayers[i].paralax
        let deltaOpacity = targetLayers[i].opacity - currentLayers[i].opacity

        let paralax = currentLayers[i].paralax + deltaParalax * progress / 100
        let opacity = currentLayers[i].opacity + deltaOpacity * progress / 100

        if(targetPage < currentPage) {
            paralax = targetLayers[i].paralax - (1 - progress / 100) * deltaParalax
            opacity = targetLayers[i].opacity - (1 - progress / 100) * deltaOpacity
        }

        return {
            ...layer,
            paralax,
            opacity,
        }
    })

    dispatch(updateBackLayers(updatedLayers), currentLayersPid)
}

/**
   Paralax slide transitions
*/
const bgParalaxSlideTransition = (sign, pages, currentPage, attachScrollEvent, detachScrollEvent) => {
    // Detach scroll event
    detachScrollEvent()

    const bgState = store.getState().bgReducer

    // Boundary condition
    const totalPages = pages.length
    const targetPage = sign > 0 ?
          (currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1)
          :
          currentPage - 1


    // Choose which layers to update
    let updateLayers = bgState.transitionProgress !== 0 ? updateFrontBg : updateBackBg

    // Animation
    let transitionProgress = 0

    // Animation timer
    const startTime = new Date()
    const deltaTime = 500

    let rafId = 0
    const transitionFunction = () => {
        if(transitionProgress > 100) {
            // Attach scroll event to page change
            attachScrollEvent()

            // cancel animation frame
            cancelAnimationFrame(rafId)

            // update layers to final paralax
            updateLayers(100, pages, currentPage, targetPage)
        } else {
            ////// Continue scrolling
            updateLayers(transitionProgress, pages, currentPage, targetPage)


            // Increment transition progress
            transitionProgress = (new Date() - startTime) / deltaTime * 100

            // Requstion animation frame
            rafId = requestAnimationFrame(transitionFunction)
        }
    }

    rafId = requestAnimationFrame(transitionFunction)
}

/**
   Pick which transition to apply
*/

const startTransition = (type, params) => {
    const { sign, pages, currentPage, attachScrollEvent, detachScrollEvent } = params
    const { BG_PARALAX, BG_SPLIT } = transitionTypes

    switch(type){
        case BG_SPLIT:
        console.log(transitions.splitBackground.slideTransition(sign, pages, currentPage, attachScrollEvent, detachScrollEvent))
        break
        case BG_PARALAX:
        console.log(transitions.bgParalax.slideTransition(sign, pages, currentPage, attachScrollEvent, detachScrollEvent))
        break
        default:
            return
    }
}

const transitions: Transitions = {
    splitBackground: {
        updateBackgroundLayers,
        resetBackgroundStyles,
        slideTransition,
    },
    bgParalax: {
        slideTransition: bgParalaxSlideTransition,
    },
    startTransition,
    types: transitionTypes,
}

export default transitions
