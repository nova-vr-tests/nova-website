
// @flow

import { styles as appStyles } from '../../constants.js'
import type { Props } from './AboutTypes.jsx'
import { getDelta } from '../Presentation/SidePanel/helpers.jsx'

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
            backgroundImage: `url(${props.bgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
        },
        wrapper2: {
            position: 'absolute',
            // bottom: `calc(3 * ${appStyles.unitHeight})`,
            top: `calc(3.25 * ${appStyles.unitHeight} - ${getDelta()}px)`,
        },
        p: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h1: {
            padding: appStyles.unitHeight + ' ' + sidebarWidth
        },
        h2: {
            // paddingBottom: 'calc(4 * ' + appStyles.unitHeight + ')',
            // height: `calc(5.7 * ${appStyles.unitHeight} - ${getDelta()}px)`,
            height: `calc(5.75 * ${appStyles.unitHeight} )`,
            boxSizing: 'border-box',
            fontSize: '2rem',
            margin: 0,
            textAlign: 'center',
        },
        sidePanel: {
            marginTop: 'calc(2.5 * ' + appStyles.unitHeight + ')',
        },
        content: {
            backgroundColor,
            padding: '2rem',
            height: `calc((24 - 6.75) * ${appStyles.unitHeight})`,
            // top: `calc(6.75 * ${appStyles.unitHeight})`,
            // position: 'absolute',
        },
        title: {
        },
    }
}

export default getStyles
