import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    let height = `calc(100vh - 11 * ${unitHeight})`
    if(clientWidth < appStyles.mediaQueries.phone) {
        height = '100%'
    }

    return {
        listWrapper: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            overflowY: 'scroll',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            width: '100%',
        },
        blogWrapper: {
            height,
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        trailingDiv: {
            minHeight: '4rem',
        },
    }
}

export default getStyles
