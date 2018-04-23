import { styles as appStyles } from '../../constants.js'

const getDefaultStyles = ({ customTextColor, customFontSize }) => {
    const { clientWidth } = document.documentElement

    let textColor = 'rgba(0, 0, 0, 0.7)'
    let rootPadding = '1rem'
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
            padding: '0rem 4rem', // h2
            fontSize: '2rem',
            fontWeight: 'normal',
        },
        {
            ...headingDefaultStyles,
            padding: '0rem 2rem', // h3
            fontWeight: 'normal',
            fontSize: '1.5rem',
        },
        {
            ...headingDefaultStyles,
            padding: '0rem 0rem', // h4
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
        color: textColor,
        fontWeight: 'bold',
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
