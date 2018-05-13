import { styles as appStyles } from '../../constants.js'

const getDefaultStyles = (props) => {
    const { customTextColor, customFontSize } = props
    const { clientWidth } = document.documentElement

    let textColor = 'white'
    let linkColor = 'rgba(255, 255, 255, 0.7)'
    let rootPadding = `calc(1 * ${appStyles.unitHeight}) calc(0.5 * ${appStyles.unitWidth})`
    let fontSize = '1.25rem'

    if(clientWidth < appStyles.mediaQueries.tablet) {
        textColor = 'white'
        fontSize = '1.5rem'
    }

    if(!props.useWhiteFont) {
        textColor = '#3d3f4c'
        linkColor = '#828a99'
    }

    // user overrides
    textColor = customTextColor || textColor
    fontSize = customFontSize || fontSize

    const headingDefaultStyles = {
        color: '#363643',
        fontFamily: 'TTNorms-medium',
        letterSpacing: '0.08rem',
    }
    const headings = [
        {
            ...headingDefaultStyles,
            padding: '1.5rem 8rem', // h1
        },
        {
            ...headingDefaultStyles,
            margin: `calc(0.75 * ${appStyles.unitHeight}) 0 calc(0.5 * ${appStyles.unitHeight}) calc(0.5 * ${appStyles.unitWidth}) `, // h2
            fontSize: '1.7rem',
            fontWeight: 'normal',
        },
        {
            ...headingDefaultStyles,
            margin: `0.75 * ${appStyles.unitHeight} 0 0.5 * ${appStyles.unitHeight} calc(0 * ${appStyles.unitWidth}) `, // h2
            fontWeight: 'normal',
            fontSize: '1.5rem',
        },
        {
            ...headingDefaultStyles,
            margin: `0.5rem 0 0rem calc(0 * ${appStyles.unitWidth}) `, // h2
            fontWeight: 'normal',
            fontSize,
        },
        {
            margin: `0.5rem 0 0rem calc(0 * ${appStyles.unitWidth}) `, // h2
            color: 'red',
        },
        {
            ...headingDefaultStyles,
            margin: `0.5rem 0 0rem calc(0 * ${appStyles.unitWidth}) `, // h2
            fontSize,
            letterSpacing: 'inherit',
            color: '#3d3f4c',
            fontWeight: 'normal',
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
        textDecoration: 'none',
        fontStyle: 'italic',
        color: linkColor,
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
        textAlign: 'justify',
        color: textColor,
    }

    const list = {
        color: textColor,
    }

    const listItem = {
        marginBottom: '0.75rem',
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
        list,
        listItem,
    }
}


const getStyles = props => {
    const styles = getDefaultStyles(props)

    if(!props.styles) {
        return styles
    }

    return {
        ...styles,
    }
}
export default getStyles
