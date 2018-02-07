import { styles as appStyles } from '../../constants.js'

const getStyles = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    const headerDisplay = props.showHeader ? 'inherit' : 'none'

    let height = `calc(100vh - 11 * ${unitHeight})`
    let backgroundColor = 'rgba(255, 255, 255, 0.7)'

    if(clientWidth < appStyles.mediaQueries.phone) {
        height = '100%'
        backgroundColor = 'rgba(0, 0, 0, 0)'
    }


    return {
        wrapper: {
            backgroundColor,
        },
        headerWrapper: ({
            display: headerDisplay,
        }),
        articleWrapper: {
            height,
            boxSizing: 'border-box',
            color: 'black',
            display: 'flex',
            overflow: 'scroll',
        }

    }
}

const getBlogPostContentStyles = props => {
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

    return {
        headings,
        root,
        image,
        table,
        tableCell,
        link,
    }
}

export default getStyles

export {
    getBlogPostContentStyles,
}
