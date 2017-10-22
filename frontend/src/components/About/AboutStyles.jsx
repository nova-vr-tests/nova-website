
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

const getStyles: GetStyles<Props, Styles> = props => {
    const sidebarWidth = 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ')'

    return {
        wrapper: {
            width: 'calc(100vw - ' + sidebarWidth + ')',
            marginLeft: sidebarWidth,
            color: 'black',
            marginTop: '8rem', // footer height
            opacity: props.opacity,
            transition: 'opacity 0.5s linear',
        },
        p: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h1: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
    }
}

export default getStyles
