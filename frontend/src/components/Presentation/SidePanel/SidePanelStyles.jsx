// @flow

import { styles as appStyles } from '../../../constants.js'

import { sidePanelTypes } from './SidePanel.jsx'

import type {
    Props,
    BgProps,
} from './SidePanelTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    isOpened: CSSStyleDeclaration,
    contentWrapper: CSSStyleDeclaration,
}

const getStyles: GetStyles<Props, Styles> = props => {
    const widthCoef = props.width < 0 ? 0 : props.width

    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'
    const headerHeightCoef = 3

    const { clientWidth } = document.documentElement
    let left = 'calc(100vw - ' + panelWidth + ')'
    if(clientWidth < appStyles.mediaQueries.phone) {
        left = 0
    }

    let bgColor = 'rgba()'
    if(clientWidth < appStyles.mediaQueries.tablet) {
        if(props.isMainPanelOpened) {
            bgColor = 'rgba(0, 0, 0, 0)'
        }
    }

    return {
        wrapper: {
        },
        isOpened: {
        },
        svg: {
            display: 'none',
            bgColor,
        },
        contentWrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left,
            padding: 'calc(' + headerHeightCoef + ' * ' + appStyles.unitHeight + ') 0 0  0',
            paddingTop: props.marginTop ? props.marginTop : 'calc(' + headerHeightCoef + ' * ' + appStyles.unitHeight + ') ' + appStyles.unitWidth,
        },
    }
}

export default getStyles


/**
            width: 'calc(100% - 2 * ' + padding + ')',
    BG
*/

type BgStyles = {
    wrapper: CSSStyleDeclaration,
    svg: CSSStyleDeclaration,
}

export const getBgStyles: GetStyles<BgProps, BgStyles> = props => {
    let panelWidth = 'calc(' + props.widthCoef + ' * ' + appStyles.unitWidth + ')'
    const { clientWidth } = document.documentElement

    let opacity = props.isFooterOpened && props.type === sidePanelTypes.DEFAULT  ? 0 : 1

    if(clientWidth < appStyles.mediaQueries.phone) {
        panelWidth = clientWidth
    }

    if(clientWidth < appStyles.mediaQueries.tablet) {
        if(props.isMainPanelOpened) {
            opacity = 0
        }
    }


    return {
        wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: panelWidth,
            right: 0,
            zIndex: props.zIndex,
        },
        svg: {
            opacity,
            transition: 'opacity 0.3s linear',
            width: panelWidth,
        },
    }
}
