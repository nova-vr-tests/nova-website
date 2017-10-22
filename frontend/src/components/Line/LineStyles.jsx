// @flow

import { styles as appStyles } from '../../constants.js'

import type { Props } from './LineTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    line: {
        wrapper: CSSStyleDeclaration,
        wrapper2: CSSStyleDeclaration,
        wrapper2Opened: CSSStyleDeclaration,
    },
}

const getStyles: GetStyles<Props, Styles> = props => {
    const theme = appStyles.themes[props.appTheme]

    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: 'calc(' + (9 + 2 * props.linePosition) + ' * ' + appStyles.unitHeight + ')',
            transition: 'margin-top, opacity ' + appStyles.sidebar.transition.length + appStyles.sidebar.transition.type,
            opacity: props.windowWidth < appStyles.mediaQueries.phone && props.isSidebarOpened ? 0 : 1,
        },
        line: {
            wrapper: {
                minHeight: 'calc(2 * ' + 100/24 + 'vh)',
                display: 'flex',
                width: '100vw',
                backgroundColor: theme.lineBgColor,
                transition: 'background-color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc,
            },
            wrapper2: {
                height: 0,
                display: 'flex',
                flex: 1,
                paddingLeft: 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ')',
                opacity: 0,
                transition: 'opacity ' + appStyles.sidebar.transition.length + appStyles.sidebar.transition.type,
            },
            wrapper2Opened: {
                height: appStyles.lineDimensions.height,
                opacity: 1,
            },
        },
    }
}

export default getStyles
