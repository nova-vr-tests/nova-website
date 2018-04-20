import { styles as appStyles } from '../../../constants.js'

const getStyles = () => {
    const { clientWidth } = document.documentElement

    let formPadding = '0 25%'
    if(clientWidth < appStyles.mediaQueries.phone) {
        formPadding = 0
    }

    return {
        wrapper: {
            padding: formPadding,
        },
        errorWrapper: {
            position: 'absolute',
            bottom: '100%',
            height: '4rem',
            width: '50%',
            fontSize: '1.5rem',
        },
        error: {
            color: 'red',
        }
    }
}

export default getStyles
