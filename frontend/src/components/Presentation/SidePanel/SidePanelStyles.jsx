// @flow

import { styles as appStyles } from '../../../constants.js'

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
    slideParagraphs: CSSStyleDeclaration,
    head: CSSStyleDeclaration,
    tail: CSSStyleDeclaration,
    title: CSSStyleDeclaration,
    paragraph: CSSStyleDeclaration,
}

const getStyles: GetStyles<Props, Styles> = props => {
    const widthCoef = props.width
    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'
    const headerHeightCoef = 3
    const footerHeightCoef = headerHeightCoef
    const lineHeightCoef = 4 // height of vertical line spanning across screen
    const lineYCoef = 9 + (2 * props.linePosition) // distance from top of screen to top of line
    const titleHeightCoef = 2
    const headHeightCoef = lineYCoef - headerHeightCoef - titleHeightCoef
    const tailHeightCoef = 24 - lineYCoef - footerHeightCoef - lineHeightCoef

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
        slideParagraphs: {
            height: 'calc(' + (24 - headerHeightCoef - titleHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY: 'hidden',
            overflowX: 'hidden',
            // min width greater than container so it doesn't shrink on panel close
            minWidth: 'calc(' + appStyles.sidePanel.openedWidthCoef + ' * ' + appStyles.unitWidth + ')',
        },
        head: {
            height: 'calc(' + headHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        tail: {
            height: 'calc(' + tailHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        title: {
            height: 'calc(2 * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            margin: 0,
            // min width greater than container so it doesn't shrink on panel close
            minWidth: 'calc(' + appStyles.sidePanel.openedWidthCoef + ' * ' + appStyles.unitWidth + ')',
        },
        paragraph: {
            height: 'calc(' + lineHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
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
            width: panelWidth,
        },
    }
}
