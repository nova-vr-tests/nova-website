import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    const headerDisplay = props.showHeader ? 'inherit' : 'none'

    let height = `calc(100vh - 11 * ${unitHeight})`

    if(clientWidth < appStyles.mediaQueries.phone) {
        height = '100%'
    }


    return {
        wrapper: {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        headerWrapper: {
            display: headerDisplay,
        },
        articleWrapper: {
            height,
            boxSizing: 'border-box',
            color: 'black',
            display: 'flex',
            overflow: 'scroll',
            padding: '2rem',
        }

    }
}

export default getStyles
