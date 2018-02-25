import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    const headerDisplay = props.showHeader ? 'inherit' : 'none'

    let height = `calc(100vh - 11 * ${unitHeight})`
    let backgroundColor = 'rgba(255, 255, 255, 0.7)'
    let color = 'black'

    if(clientWidth < appStyles.mediaQueries.phone || props.sidePanelMode) {
        height = '100%'
        backgroundColor = 'rgba(0, 0, 0, 0)'
        color = 'white'
    } else if(clientWidth < appStyles.mediaQueries.tablet) {
        backgroundColor = 'rgba(0, 0, 0, 0)'
        color = 'white'
    }

    return {
        wrapper: {
            backgroundColor,
        },
        headerWrapper: ({
            display: headerDisplay,
        }),
        articleWrapper: {
            height,
            boxSizing: 'border-box',
            color,
            display: 'flex',
            flexDirection: 'column',
        }

    }
}

export default getStyles
