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

    const padding = '2rem'

    return {
        headerWrapper: {
            height: appStyles.unitHeightJs * 6,
        },
        slideParagraphs: {
            height: 'calc(' + (24 - headerHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY,
            overflowX,
            // min width greater than container so it doesn't shrink on panel close
            minWidth,
            padding: '0 ' + padding,
            boxSizing: 'border-box',
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
        allParagraphs: {
            minHeight: 'calc(' + 8 + ' * ' + appStyles.unitHeight + ') ',
        },
        paragraph: {
            // height: 'calc(' + lineHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
        },
        dummy: {
            display: 'none',
            color: 'rgba(0, 0, 0, 0)',
        }
    }
}


const getNextPageStyles = props => ({
    wrapper: {
        height: 'calc(2 * ' + appStyles.unitHeight + ')',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem 0',
        cursor: 'pointer',
    },
    img: {
        width: 'calc(1 * ' + appStyles.unitHeight + ')',
        height: 'calc(1 * ' + appStyles.unitHeight + ')',
        transform: 'rotateZ(90deg)',
    },
})

export default getStyles

export {
    getNextPageStyles,
}
