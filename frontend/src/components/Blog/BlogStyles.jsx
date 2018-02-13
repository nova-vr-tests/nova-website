import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    const headerDisplay = props.showHeader ? 'inherit' : 'none'

    let height = `calc(100vh - 11 * ${unitHeight})`
    let backgroundColor = 'rgba(255, 255, 255, 0.7)'

    if(clientWidth < appStyles.mediaQueries.phone) {
        height = '100%'
        backgroundColor = 'rgba(0, 0, 0, 0)'
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
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
        }

    }
}

export default getStyles
