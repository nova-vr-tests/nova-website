import { styles as appStyles } from '../../constants'

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

    const styles = {
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
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        subtitle: {
            marginTop: '0.75rem',
            fontSize: '1.2rem',
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 1.5rem',
            flex: 1,
            justifyContent: 'center',
        },
    }

    return styles
}

export default getStyles
