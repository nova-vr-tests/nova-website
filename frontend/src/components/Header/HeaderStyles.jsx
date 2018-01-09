// @flow

import { styles as appStyles } from '../../constants.js'

import type { Props } from './HeaderTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    bgImage: CSSStyleDeclaration,
    circle: CSSStyleDeclaration,
    logo: CSSStyleDeclaration,
    logoSidebarClosed: CSSStyleDeclaration,
}

const getStyles: GetStyles<Props, Styles> = props => {
    const { radius, diam, centerX, centerY } = appStyles.header

    return {
        wrapper: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: 'calc(3 * ' + appStyles.unitHeight + 'vh)',
        },
        svg: {
            position: 'absolute',
            zIndex: '20',
            bottom: 0,
        },
        bgImage: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        logo: {
            position: 'absolute',
            height: appStyles.unitHeight,
            width: appStyles.unitHeight,
            filter: 'invert(100%)',
            top: 'calc(' + appStyles.unitHeight + ' / 2)',
            left: 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ' / 2 - 2 * ' + appStyles.unitHeight + ' / 6)',
            zIndex: 1,
            transition: 'transform ' + appStyles.sidebar.hoverTransition.length + appStyles.sidebar.hoverTransition.type,
            cursor: 'pointer',
        },
        logoSidebarClosed: {
            transform: 'translateX(calc(-' + appStyles.unitHeight + ' / 2))',
        },
    }
}

export default getStyles
