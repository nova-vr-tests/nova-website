import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        linkWrapper: {
            display: 'flex',
            height: '4rem',
            fontSize: '2rem',
            alignItems: 'center',
        },
    }
}

export default getStyles
