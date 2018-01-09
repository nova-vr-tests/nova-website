// @flow

import { styles as appStyles } from '../../constants.js'

import type { Props } from './PresentationTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    sidePanel: CSSStyleDeclaration,
    toc: CSSStyleDeclaration,
}

// eslint-disable-next-line no-unused-vars
const getStyles: GetStyles<Props, Styles> = props => {
    let tocBgColor = appStyles.themes[props.appTheme].lineBgColor
    if(props.windowWidth < appStyles.mediaQueries.phone) {
        tocBgColor = 'rgba(0, 0, 0, 0)'
    }

    return {
        wrapper: {
            display: 'flex',
            flex: 1,
        },
        sidePanel: {
            display: 'flex',
            flex: 1,
        },
        toc: {
            display: 'flex',
            backgroundColor: tocBgColor,
            paddingLeft: 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ')',
            boxSizing: 'border-box',
            width: (
                'calc(100vw - '
                 + appStyles.sidePanel.openedWidthCoef * (props.isSidePanelOpened ? 1 : 0)
                 + ' * '
                 + appStyles.unitWidth
                + ')'
            ),
            transition: 'width 0.3s linear',
        },
    }
}

export default getStyles
