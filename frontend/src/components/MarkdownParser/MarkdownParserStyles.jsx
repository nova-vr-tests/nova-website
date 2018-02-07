import { styles as appStyles } from '../../constants.js'

const getStyles = () => {
    const { clientWidth } = document.documentElement

    let textColor = 'black'
    let rootPadding = '1rem'
    if(clientWidth < appStyles.mediaQueries.phone) {
        textColor = 'white'
    }

    const headings = [
        {
            padding: '1.5rem 8rem', // h1
        },
        {
            padding: '1rem 4rem', // h2
        },
        {
            padding: '0rem 2rem', // h3
        },
        {
            padding: '0rem 1rem', // h4
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
        color: textColor,
        padding: rootPadding,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'scroll',
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

    return {
        headings,
        root,
        image,
        table,
        tableCell,
        tableWrapper,
        link,
    }
}

export default getStyles
