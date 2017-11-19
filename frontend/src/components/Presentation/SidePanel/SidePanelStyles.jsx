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

    return {
        wrapper: {
        },
        isOpened: {
        },
        contentWrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 'calc(100vw - ' + panelWidth + ')',
            padding: 'calc(' + headerHeightCoef + ' * ' + appStyles.unitHeight + ') ' + appStyles.unitWidth,
        },
    }
}

export default getStyles


/**
    BG
*/

type BgStyles = {
    wrapper: CSSStyleDeclaration,
    svg: CSSStyleDeclaration,
}

export const getBgStyles: GetStyles<BgProps, BgStyles> = props => {
    const panelWidth = 'calc(' + props.widthCoef + ' * ' + appStyles.unitWidth + ')'
    return {
        wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: panelWidth,
            right: 0,
        },
        svg: {
            opacity: props.isFooterOpened && props.type === sidePanelTypes.DEFAULT  ? 0 : 1,
            transition: 'opacity 0.3s linear',
            width: panelWidth,
        },
    }
}
