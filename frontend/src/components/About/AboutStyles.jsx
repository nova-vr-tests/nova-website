
// @flow

import { styles as appStyles } from '../../constants.js'
import type { Props } from './AboutTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'

type Styles = {
    wrapper: CSSStyleDeclaration,
    p: CSSStyleDeclaration,
    h1: CSSStyleDeclaration,
}

const { unitHeight, unitWidth } = appStyles
const { widthFactor } = appStyles.sidebar
const sidePanelWidthCoef = appStyles.sidePanel.openedWidthCoef

const getStyles: GetStyles<Props, Styles> = props => {
    const sidebarWidth = 'calc(' + widthFactor + ' * ' + unitWidth + ')'
    const sidePanelWidth = 'calc(' + sidePanelWidthCoef + ' * ' + unitWidth + ')'

    let backgroundColor = 'rgba(0, 0, 0, 0.1)'
    if (document.documentElement.clientWidth < appStyles.mediaQueries.phone) {
        backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    return {
        wrapper: {
            width: 'calc(100vw - ' + sidebarWidth + ')',
            position: 'relative',
            color: 'black',
            opacity: props.opacity,
            transition: 'opacity 0.5s linear',
            paddingLeft: sidebarWidth,
            height: '100%',
        },
        p: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h1: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h2: {
            paddingLeft: '4rem',
            paddingBottom: '2rem',
            paddingBottom: 'calc(2 * ' + appStyles.unitHeight + ')',
            boxSizing: 'border-box',
            fontSize: '2rem',
            margin: 0,
        },
        sidePanel: {
            marginTop: '20vh',
        },
        content: {
            backgroundColor,
            height: '100%',
            padding: '2rem',
        }
    }
}

export default getStyles
