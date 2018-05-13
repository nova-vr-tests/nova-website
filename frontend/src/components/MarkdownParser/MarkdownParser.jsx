import React from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import getStyles from './MarkdownParserStyles.jsx'

const contentReduxState = () => ({
})

const BlogPostContent = props => {
    const styles = getStyles(props)

    const renderers = {
        root: _props => <div
                           className={ `markdown-parser--wrapper ${props.addTail ? 'tail' : ''}` }
                           style={ styles.root }>{ _props.children }</div>,
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
        list: props =>
            <ul style={ styles.list }>{ props.children }</ul>,
        listItem: props =>
            <li style={ styles.listItem }>{ props.children }</li>,
        paragraph: props =>
            <p style={ styles.p }>{ props.children }</p>,
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
                alt="figure" />
    }

    return <ReactMarkdown
               renderers={ renderers }
               source={ props.content } />
}

BlogPostContent.defaultProps = {
    styles: {},
    addTail: true,
}

export default connect(contentReduxState)(BlogPostContent)
