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
            border: '1.5px solid white',
            margin: `calc(0.25 * ${appStyles.unitHeight})`,
            cursor: 'pointer',
            ...borderRadius,
            marginRight: 0,
            marginLeft: `calc(0.5 * ${appStyles.unitWidth})`,
            justifySelf: 'flex-end',
            borderRight: 'none',
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
            zIndex: -1,
            height: `calc(${linkWrapperHeight} - 0px)`,
            width: linkWrapperHeight,
            ...borderRadius,
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            flex: 1,
        },
    }
}

export default getStyles
