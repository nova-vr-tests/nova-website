// @flow

import { styles as appStyles } from '../../../constants.js'

const coord2CircDefault = (x: number): {y1: number, y2: number} => {
    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const { radius, centerX, centerY } = appStyles.header

    // unit conversions
    const r = radius * vh
    const Cx = centerX * vw
    const Cy = centerY * vh

    // solve for x = sidebar width

    // solve for the determinant
    const delta1 = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const delta2 = Math.pow(2 * Cy, 2) + 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const y1 = ((2*Cy) + Math.sqrt(delta1)) / 2
    const y2 = ((2*Cy) + Math.sqrt(delta2)) / 2

    return { y1, y2 }
}

const coord2CircInverted = (x: number): {y1: number, y2: number} => {
    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    let { radius, centerX, centerY } = appStyles.header

    // unit conversions
    const r = radius * vh
    const Cx = centerX * vw
    const Cy = centerY * vh + 2 * r - 2.65 * 1 / 24 * 100 * vh // 10.5 * vh

    // solve for x = sidebar width

    // solve for the determinant
    const delta = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const y2 = ((2*Cy) + Math.sqrt(delta)) / 2
    const y1 = ((2*Cy) - Math.sqrt(delta)) / 2

    return { y1, y2 }
}

const togglePanel = (initWidth: number, targetWidth: number, progress: number, setWidth: number => void, initTimestamp: number) => {
    if(progress >= 1)
        progress = 1

    const dist = targetWidth - initWidth
    const currentPos = initWidth + dist * progress

    const transitionTime = appStyles.sidePanel.transitionTime
    const newProgress = (new Date().getTime() - initTimestamp) / transitionTime

    if(progress < 1) {
        requestAnimationFrame(() => togglePanel(initWidth, targetWidth, newProgress, setWidth, initTimestamp))
    }

    setWidth(currentPos)

}

export {
    coord2CircDefault,
    coord2CircInverted,
    togglePanel,
}
