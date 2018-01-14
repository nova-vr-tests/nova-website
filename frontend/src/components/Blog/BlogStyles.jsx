import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    return {
        wrapper: {
        },
        articleWrapper: {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            height: `calc(100vh - 9 * ${unitHeight})`,
            color: 'black',
        }

    }
}

export default getStyles
