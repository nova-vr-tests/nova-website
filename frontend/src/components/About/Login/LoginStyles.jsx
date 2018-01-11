import { styles as appStyles } from '../../../constants.js'

const getStyles = padding => {
    const { clientWidth } = document.documentElement

    let formPadding = '0 25%'
    if(clientWidth < appStyles.mediaQueries.phone) {
        formPadding = 0
    }

    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: formPadding,
        },
        input: {
            margin: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '1px solid black',
            borderRadius: '1rem',
            padding: '0 2rem',
        },
        button: {
            margin: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '1px solid black',
            borderRadius: '1rem',
            padding: '0 2rem',
            cursor: 'pointer',
        }
    }
}

export default getStyles
