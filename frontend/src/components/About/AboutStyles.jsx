
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

    return {
        wrapper: {
            width: 'calc(100vw - ' + sidebarWidth + ')',
            position: 'relative',
            color: 'black',
            opacity: props.opacity,
            transition: 'opacity 0.5s linear',
            paddingLeft: sidebarWidth,
        },
        p: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h1: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h2: {
            width: 'calc(100vw - ' + sidePanelWidth + ' - ' + sidebarWidth + ')',
            paddingTop: 'calc(' + 5 + ' * ' + unitHeight + ')',
            paddingLeft: 'calc(' + 3 + ' * ' + unitWidth + ')',
            boxSizing: 'border-box',
            fontSize: '2rem',
        }
    }
}

export default getStyles
