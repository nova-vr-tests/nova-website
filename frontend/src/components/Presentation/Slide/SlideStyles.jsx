import { styles as appStyles } from '../../../constants.js'

const getStyles = props => {
    const headerHeightCoef = 3
    const footerHeightCoef = headerHeightCoef
    const lineHeightCoef = 4 // height of vertical line spanning across screen
    const lineYCoef = 9 + (2 * props.linePosition) // distance from top of screen to top of line
    const titleHeightCoef = 2
    const headHeightCoef = lineYCoef - headerHeightCoef - titleHeightCoef
    const tailHeightCoef = 24 - lineYCoef - footerHeightCoef - lineHeightCoef

    return {
        slideParagraphs: {
            height: 'calc(' + (24 - headerHeightCoef - titleHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY: 'hidden',
            overflowX: 'hidden',
            // min width greater than container so it doesn't shrink on panel close
            minWidth: 'calc(' + appStyles.sidePanel.openedWidthCoef + ' * ' + appStyles.unitWidth + ')',
        },
        head: {
            height: 'calc(' + headHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        tail: {
            height: 'calc(' + tailHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        title: {
            height: 'calc(2 * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            margin: 0,
            // min width greater than container so it doesn't shrink on panel close
            minWidth: 'calc(' + appStyles.sidePanel.openedWidthCoef + ' * ' + appStyles.unitWidth + ')',
        },
        paragraph: {
            height: 'calc(' + lineHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
    }
}

export default getStyles
