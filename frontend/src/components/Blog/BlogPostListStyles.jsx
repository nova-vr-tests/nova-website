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
            minHeight: '6rem',
            fontSize: '2rem',
            justifyContent: 'fle',
            flexDirection: 'column',
            border: '1px solid white',
            margin: '1rem',
            padding: '0.5rem 1.5rem',
            cursor: 'pointer',
        },
        title: {
            paddingLeft: '1rem',
        },
        content: {
            fontSize: '1rem',
            flex: 1,
            alignItems: 'center',
            display: 'flex',
        },
        activeLink: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    }
}

export default getStyles
