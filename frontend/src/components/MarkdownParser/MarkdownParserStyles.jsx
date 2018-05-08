import { styles as appStyles } from '../../constants.js'

const getDefaultStyles = ({ customTextColor, customFontSize }) => {
    const { clientWidth } = document.documentElement

    let textColor = 'rgba(0, 0, 0, 0.7)'
    let rootPadding = `calc(1 * ${appStyles.unitHeight}) calc(0.75 * ${appStyles.unitWidth})`
    let fontSize = '1.25rem'
    if(clientWidth < appStyles.mediaQueries.tablet) {
        textColor = 'white'
        fontSize = '1.5rem'
    }

    // user overrides
    textColor = customTextColor || textColor
    fontSize = customFontSize || fontSize

    const headingDefaultStyles = {
            color: 'inherit',
    }
    const headings = [
        {
            ...headingDefaultStyles,
            padding: '1.5rem 8rem', // h1
        },
        {
            ...headingDefaultStyles,
            margin: `calc(1 * ${appStyles.unitHeight}) 0 calc(0.5 * ${appStyles.unitHeight}) calc(1 * ${appStyles.unitWidth}) `, // h2
            fontSize: '1.7rem',
            fontWeight: 'normal',
        },
        {
            ...headingDefaultStyles,
            margin: `0.75rem 0 0.5rem calc(0.5 * ${appStyles.unitWidth}) `, // h2
            fontWeight: 'normal',
            fontSize: '1.5rem',
        },
        {
            ...headingDefaultStyles,
            margin: `0.5rem 0 0.5rem calc(0 * ${appStyles.unitWidth}) `, // h2
            fontWeight: 'normal',
        },
        {
            padding: '0rem 0.5rem', // h5
        },
        {
            padding: '0rem 0.5rem', // h6
        },
        {
            padding: '0rem 0.5rem', // h7
        },
    ]

    const root = {
        padding: rootPadding,
        paddingTop: 0,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
        fontSize,
        fontFamily: 'caslon',
    }

    const image = {
        maxWidth: `calc(100% + 2rem)`,
        margin: `0 -${rootPadding}`,
        minWidth: `calc(100% + 2rem)`,
    }

    const table = {
        margin: '2rem auto',
        borderCollapse: 'collapse',
    }

    const tableCell = {
        border: `1px solid ${textColor}`,
        padding: '0.5rem',
    }

    const link = {
        color: 'inherit',
        fontWeight: 'bold',
        textDecoration: 'none',
    }

    const tableWrapper = {
        maxWidth: `calc(100% - 0 * ${rootPadding})`,
        overflowX: 'auto',
        margin: 0,
        boxSizing: 'content-box',
        minHeight: 'min-content',
    }

    const p = {
        margin: '0.5rem 0',
    }

    return {
        headings,
        root,
        image,
        table,
        tableCell,
        tableWrapper,
        p,
        link,
    }
}


const getStyles = props => {
    const styles = getDefaultStyles({
        customFontSize: props.styles.fontSize,
        customTextColor: props.styles.textColor })

    if(!props.styles) {
        return styles
    }

    return {
        ...styles,
    }
}
export default getStyles
