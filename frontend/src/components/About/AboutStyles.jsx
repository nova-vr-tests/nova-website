
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
    sidePanel: CSSStyleDeclaration,
    title: CSSStyleDeclaration,
    content: CSSStyleDeclaration,
    h2: CSSStyleDeclaration,
}

const { unitWidth } = appStyles
const { widthFactor } = appStyles.sidebar

const getStyles: GetStyles<Props, Styles> = props => {
    const sidebarWidth = 'calc(' + widthFactor + ' * ' + unitWidth + ')'

    let backgroundColor = 'rgba(255, 255, 255, 0.5)'
    let wrapperOpacity = props.opacity
    if (document.documentElement.clientWidth < appStyles.mediaQueries.phone) {
        backgroundColor = 'rgba(0, 0, 0, 0)'

        wrapperOpacity = props.isSidebarOpened ? 0 : wrapperOpacity
    }

    return {
        wrapper: {
            width: 'calc(100vw - ' + sidebarWidth + ')',
            position: 'relative',
            color: 'black',
            opacity: wrapperOpacity,
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
            paddingBottom: 'calc(4 * ' + appStyles.unitHeight + ')',
            boxSizing: 'border-box',
            fontSize: '2rem',
            margin: 0,
            textAlign: 'center',
        },
        sidePanel: {
            marginTop: 'calc(1.5 * ' + appStyles.unitHeight + ')',
        },
        content: {
            backgroundColor,
            height: '100%',
            padding: '2rem',
        },
        title: {
        },
    }
}

export default getStyles
