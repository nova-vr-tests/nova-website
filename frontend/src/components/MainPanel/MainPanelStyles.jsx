import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight, unitWidth } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    const right = `calc(${ appStyles.sidePanel.openedWidthCoef } * ${ unitWidth })`
    const left = `calc(2 * ${ appStyles.sidebar.widthFactor } * ${ unitWidth })`
    const top = 0
    const paddingTop = `calc(3 * ${ unitHeight })`
    const pointerEvents = props.isOpened ? 'inherit' : 'none'

    return {
        wrapper: {
            opacity: props.isOpened ? 1 : 0,
            transition: 'opacity 0.5s linear',
            position: 'absolute',
            left,
            right,
            top,
            paddingTop,
            bottom: 0,
            pointerEvents,
        },
    }
}

export default getStyles
