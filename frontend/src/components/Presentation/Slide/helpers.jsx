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

export {
    scrollTo,
}
