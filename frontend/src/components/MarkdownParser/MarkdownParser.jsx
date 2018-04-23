import React from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import getStyles from './MarkdownParserStyles.jsx'

const contentReduxState = () => ({
})

const BlogPostContent = props => {
    const styles = getStyles(props)

    const renderers = {
        root: props => <div className="markdown-parser--wrapper" style={ styles.root }>{ props.children }</div>,
        h1: props => <h1 style={{ color: 'red' }}>{ props.children }</h1>,
        table: props =>
            <div style={ styles.tableWrapper }>
                <table style={ styles.table }>{ props.children }</table>
            </div>,
        link: props =>
            <a
                href={ props.href }
                target="_blank"
                style={ styles.link }>{ props.children }</a>,
        tableCell: props =>
            React.createElement(
                `t${props.isHeader ? 'h' : 'd'}`,
                { style: styles.tableCell },
                props.children),
        heading: props =>
            React.createElement(
                `h${props.level}`,
                { style: styles.headings[props.level] },
                props.children),
        image: ({ src }) =>
            <img
                src={ src }
                style={ styles.image }
                alt="hello" />
    }

    return <ReactMarkdown
               renderers={ renderers }
               source={ props.content } />
}

BlogPostContent.defaultProps = {
    styles: {},
}

export default connect(contentReduxState)(BlogPostContent)
