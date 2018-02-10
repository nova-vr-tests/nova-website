import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeightJs } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    const linkWrapperHeight = unitHeightJs * 2.5 + 'px'
    const borderRadius = {
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
    }

    console.log(linkWrapperHeight)
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
        linkWrapper: {
            display: 'flex',
            minHeight: linkWrapperHeight,
            fontSize: '2rem',
            justifyContent: 'fle',
            border: '1px solid white',
            margin: '1rem',
            cursor: 'pointer',
            ...borderRadius,
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
        picto: {
            height: linkWrapperHeight,
            width: linkWrapperHeight,
            ...borderRadius,
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 1.5rem',
        },
    }
}

export default getStyles
