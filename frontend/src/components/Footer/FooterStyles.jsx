// @flow

import { styles as appStyles } from '../../constants.js'

import { INTRO_FINISHED } from '../../constants.js'

import type {
    Props,
    PresentationControlsProps,
} from './FooterTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    footerWrapper: CSSStyleDeclaration,
    footerBackground: CSSStyleDeclaration,
    wrapper: CSSStyleDeclaration,
    toggleSidebarButton: CSSStyleDeclaration,
    rotatedCloseButton: CSSStyleDeclaration,
    quickLinks: CSSStyleDeclaration,
    closeFooterArrowWrapper: CSSStyleDeclaration,
    closeFooterArrowImg: CSSStyleDeclaration,
}

const getStyles: GetStyles<Props, Styles> = props => {
    const height = appStyles.unitHeight
    const width = height
    const isIntroFinished = props.introKeyframe >= INTRO_FINISHED ? true : false


    const theme = appStyles.themes[props.appTheme]

    const footerBgCenter = {
        x: '50vw',
        y: '1429vh',
        radius: '1340vh',
        diam: '',
    }

    footerBgCenter.diam = 'calc(' + footerBgCenter.radius + ' * 2)'

    if(!isIntroFinished) {
        footerBgCenter.x = '100vw'
        footerBgCenter.y = '1400vh'
    }

    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const footerHeight = 2.4 * appStyles.unitHeightJs // 2.4 * unitHeight seems to be header height on all screen sizes (vs 3 as coef which is what it's supposed to be...)

    // To find intersection point of header and sidebar offset caused by border radius
    let footerRadiusOffset = (() => {
        const radius = 1340 //footerBgCenter
        const { unitWidthJs } = appStyles
        const centerX = 50 //footerBgCenter.x
        const centerY = 1339 //footerBgCenter.y

        // unite conversions
        const unitWidth = unitWidthJs
        const r = radius * vh
        const Cx = centerX * vw
        const Cy = centerY * vh

        // solve for x = sidebar width
        const x =  3 * unitWidth

        // solve for the determinant
        const delta = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
        const borderOffset = ((2*Cy) + Math.sqrt(delta)) / 2

        return (borderOffset - 2 * Cy)
    })()

    let footerOffset = props.isFooterOpened && isIntroFinished ?
                       '(100vh - ' + (footerHeight + footerRadiusOffset + props.sidebarHeaderIntersection) + 'px)'
                     :
                       '0vh'


    return {
        footerWrapper: {
            display: 'flex',
            height: footerHeight,
        },
        svg: {
            transform: 'rotateX(180deg)translateY(calc(0.5 * ' + appStyles.unitHeight + '))',
            position: 'absolute',
            top: '0',
            width: '100vw',
            pointerEvents: 'none',
            zIndex: -1,
        },
        footerBackground: {
            position: 'absolute',
            borderRadius: footerBgCenter.diam,
            transition: 'transform 0.5s, background-color 0.5s linear',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translateY(calc(-' + appStyles.unitHeight + ' / 4 - ' + footerOffset + '))',
            height: '100%',
        },
        wrapper: {
            transition: props.introKeyframe >= INTRO_FINISHED ? 'background-color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc : 'transform 2s linear'
        },
        toggleSidebarButton: {
            position: 'absolute',
            height,
            width,
            transition: 'transform ' + appStyles.sidebar.hoverTransition.length + ', opacity ' + appStyles.sidebar.hoverTransition.length + appStyles.sidebar.hoverTransition.type,
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            left: 'calc(' + appStyles.sidebar.widthFactor + ' / 2 * ' + appStyles.unitWidth + ' - ' + height + ' / 2 - ' + width + ' / 3)',
            transform: 'rotateZ(45deg)translateX(calc(0.99 / 3 * ' + width + '))translateY(calc(-0.50 / 3 * ' + height + '))',
            cursor: 'pointer',
            opacity: props.introKeyframe >= INTRO_FINISHED ? 1 : 0,
        },
        rotatedCloseButton: {
            transform: 'inherit',
        },
        quickLinks: {
            transition: 'opacity 0.5s linear',
            position: 'absolute',
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            height: 'calc(2.1 * ' + appStyles.unitHeight + ' / 3)',
            right: 'calc(' + appStyles.unitWidth + ')',
            fontSize: appStyles.UI.P.fontSize,
            color: 'rgba(200, 200, 200, 0.9)',
            display: 'flex',
            alignItems:'center',
            cursor: 'pointer',
            opacity: (props.introKeyframe >= INTRO_FINISHED + 1 && !props.isFooterOpened) ? 1 : 1,
        },
        closeFooterArrowWrapper: {
            transition: 'transform 0.5s, background-color 0.5s linear',
            transform: 'translateY(calc(-' + appStyles.unitHeight + ' / 4 - ' + footerOffset + '))translateX(' + footerBgCenter.x + ')',
            height: '0px',
            color: 'red',
            position: 'relative',
        },
        closeFooterArrowImg: {
            height: '2rem',
            width: '2rem',
            position: 'absolute',
            bottom: '100%',
            cursor: 'pointer',
            opacity: props.isFooterOpened ? 1 : 0,
            transform: 'translateX(-50%)rotateZ(90deg)',
        }
    }
}


/**
   PresentationControls styles
*/

type PresentationControlsStyles = {
    wrapper: CSSStyleDeclaration,
    controlButtonWrapper: CSSStyleDeclaration,
    controlButtonActive: CSSStyleDeclaration,
}

const getPresentationControlsStyles: GetStyles<PresentationControlsProps, PresentationControlsStyles> = props => {
    return {
        wrapper: {
            fontSize: '5rem',
            color: 'red',
            zIndex: 1,
            position: 'absolute',
            transform: 'translateX(-50%)',
            left: '50%',
            display: 'flex',
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            height: 'calc(2.1 * ' + appStyles.unitHeight + ' / 3)',
            opacity: props.isFooterOpened ? 0 : 1,
            transition: 'opacity 0.5s linear',
        },
        controlButtonWrapper: {
            opacity: props.opacity,
            width: '1rem',
            height: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(220, 220, 220, 0.9)',
            margin: '0.5rem',
            cursor: 'pointer',
        },
        controlButtonActive: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
    }
}



export default getStyles

export {
    getPresentationControlsStyles,
}
