import { styles as appStyles } from '../../constants'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeightJs } = appStyles

    if(clientWidth < appStyles.mediaQueries.phone) {
    }

    const linkWrapperHeight = unitHeightJs * 3 + 'px'
    const borderRadius = {
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
    }

    const pictoWidthCoef = props.isSquarePicto ? 1 : 2
    const pictoTransform = props.isSquarePicto ? 'inherit' : `translate(-20px, 20px)`
    const pictoDisplay = props.pictoUrl === '' ? 'none' : 'inherit' // dont' show pictos if url is empty
    const pictoBgDisplay = props.pictoBgUrl === '' ? 'none' : 'inherit' // dont' show pictos if url is empty

    const styles = {
        linkWrapper: {
            display: 'flex',
            minHeight: linkWrapperHeight,
            fontSize: '2rem',
            justifyContent: 'fle',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            margin: `calc(0.45 * ${appStyles.unitHeight})`,
            cursor: 'pointer',
            ...borderRadius,
            marginRight: 0,
            marginLeft: `calc(0.5 * ${appStyles.unitWidth})`,
            justifySelf: 'flex-end',
            borderRight: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            position: 'relative',
        },
        activeLink: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        pictoBg: {
            height: `calc(${linkWrapperHeight} - 0px)`,
            width: `calc(${pictoWidthCoef} * ${linkWrapperHeight})`,
            ...borderRadius,
            display: pictoBgDisplay,
            position: 'absolute',
            left: 0,
            top: 0,
        },
        picto: {
            height: `calc(${linkWrapperHeight} - 0px)`,
            width: `calc(${pictoWidthCoef} * ${linkWrapperHeight})`,
            transform: pictoTransform,
            display: pictoDisplay,
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
