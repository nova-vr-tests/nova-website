import { styles as appStyles } from '../../../constants.js'

const getStyles = props => {
    const headerHeightCoef = 3
    const footerHeightCoef = headerHeightCoef
    const lineHeightCoef = 4 // height of vertical line spanning across screen
    const lineYCoef = 9 + (2 * props.linePosition) // distance from top of screen to top of line
    const titleHeightCoef = 4
    const headHeightCoef = lineYCoef - headerHeightCoef - titleHeightCoef
    const tailHeightCoef = 24 - lineYCoef - footerHeightCoef - lineHeightCoef

    let overflowX = 'hidden'
    let overflowY = 'hidden'
    const sidePanelPadding = '12.5vh' // see SidePanelStyles.jsx
    let minWidth = 'calc(' + appStyles.sidePanel.openedWidthCoef + ' * ' + appStyles.unitWidth + ' - ' + sidePanelPadding + ' * 2)'
    const { clientWidth } = document.documentElement
    if(clientWidth < appStyles.mediaQueries.phone) {
        overflowY = 'scroll'
        minWidth = '100%'
    }

    return {
        slideParagraphs: {
            height: 'calc(' + (24 - headerHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY,
            overflowX,
            // min width greater than container so it doesn't shrink on panel close
            minWidth,
        },
        head: {
            height: 'calc(' + headHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        tail: {
            height: 'calc(' + tailHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        title: {
            height: 'calc(' + titleHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            padding: 0,
            margin: 0,
            // min width greater than container so it doesn't shrink on panel close
            minWidth,
        },
        paragraph: {
            // height: 'calc(' + lineHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            width: '100%',
        },
        dummy: {
            display: 'none',
            color: 'rgba(0, 0, 0, 0)',
        }
    }
}

export default getStyles
