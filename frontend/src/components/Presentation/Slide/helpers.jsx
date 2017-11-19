// @flow

import { styles as appStyles } from '../../../constants.js'

const scrollTo = (id: string, initScroll: number, targetScroll: number, progress: number, initTimestamp: number) => {
    const el = document.getElementById(id)

    const scrollDistance = targetScroll - initScroll
    const currentScroll = initScroll + scrollDistance * progress

    const transitionTime = appStyles.slideTransitionTime
    const newProgress = (new Date().getTime() - initTimestamp) / transitionTime

    if(progress >= 1) {
        return
    } else {
        el.scrollTo(0, currentScroll)
        requestAnimationFrame(() => scrollTo(id, initScroll, targetScroll, newProgress, initTimestamp))
    }

}

const getParagraphsSize = (id) => {
    const paragraphs = document.getElementById(id)
    console.log(Array.from(paragraphs.childNodes))

    paragraphs.style.display = 'block'
    const margins = 5 // px, both sides
    const pHeights = Array.from(paragraphs.childNodes).map(e => e.clientHeight - margins)
    paragraphs.style.display = 'none'


    return pHeights
}

export {
    getParagraphsSize,
    scrollTo,
}
