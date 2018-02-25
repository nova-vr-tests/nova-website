import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement

    if(clientWidth < appStyles.mediaQueries.phone) {
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
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
    }
}

export default getStyles
