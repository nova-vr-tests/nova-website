import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    return {
        wrapper: {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        articleWrapper: {
            height: `calc(100vh - 11 * ${unitHeight})`,
            boxSizing: 'border-box',
            color: 'black',
            display: 'flex',
            overflow: 'scroll',
            padding: '2rem',
        }

    }
}

export default getStyles
