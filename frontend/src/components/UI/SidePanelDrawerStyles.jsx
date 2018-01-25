import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitWidth, unitHeight } = appStyles

    const sidePanelWidth = `calc(
        ${appStyles.sidePanel.openedWidthCoef}
        * ${unitWidth})`

    const transition = 'transform 0.2s ease-out'
    let position = 0

    let height = 'inherit'
    let overflowY = 'inherit'
    if(clientWidth < appStyles.mediaQueries.phone) {
        position = props.position
        height = `calc(13 * ${unitHeight})`
        overflowY = 'scroll'
    }

    const rightWrapperTranslate = (1 - position) * 100
    const leftWrapperTranslate = -position * 100

    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            height,
        },
        leftWrapper: {
            transform: `translate(${leftWrapperTranslate}%)`,
            transition,
            width: '100%',
            overflowY,
            height,
        },
        rightWrapper: {
            position: 'absolute',
            right: 0,
            left: 0,
            transform: `translate(${rightWrapperTranslate}%)`,
            transition,
            overflowY,
            height,
        },
    }
}

export default getStyles
