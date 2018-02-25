import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeightJs } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    const linkWrapperHeight = unitHeightJs * 2.50 + 'px'
    const borderRadius = {
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
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
        activeLink: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        picto: {
            height: `calc(${linkWrapperHeight} - 0px)`,
            width: `calc(2 * ${linkWrapperHeight})`,
            transform: `translate(-20px, 20px)`,
            ...borderRadius,
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 1.5rem',
            flex: 1,
            justifyContent: 'center',
        },
    }
}

export default getStyles
