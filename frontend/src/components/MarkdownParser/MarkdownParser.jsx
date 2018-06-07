import React from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import getStyles from './MarkdownParserStyles.jsx'

import './styles.css'


import {
    updateImgViewerUrl,
    updateImgViewerIsOpened,
} from '../../reducer/actions/App.js'

const contentReduxState = () => ({
})

const contentReduxDispatch = dispatch => ({
    updateImgViewerUrl: url => dispatch(updateImgViewerUrl(url)),
    updateImgViewerisOpened: isOpened => dispatch(updateImgViewerIsOpened(isOpened)),
})

const BlogPostContent = props => {
    const styles = getStyles(props)


    const Headings = props =>
        React.createElement(
            `h${props.level}`,
            { style: styles.headings[props.level] },
            props.children)

    const P = props => {
        if(props.children[0].length > 4) {
            if(props.children[0].substring(0, 4) === "!!! ") {
                const importantPStyles = {
                    ...styles.p,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderTopRightRadius: '30px',
                    borderBottomRightRadius: '30px',
                    padding: '1.5rem',
                    paddingRight: '1rem',
                    marginRight: '-1rem',
                    marginLeft: '-30px',
                    paddingLeft: '30px',
                }
                return <p style={ importantPStyles }>{ props.children[0].substring(4, props.children[0].length) }</p>
            }
        }
        return (
            <p style={ styles.p }>{ props.children }</p>
        )
    }


    const renderers = {
        root: _props => <div
                           className={ `markdown-parser--wrapper ${props.addTail ? 'tail' : ''}` }
                           style={ styles.root }>{ _props.children }</div>,
        h1: props => <h1 style={{ color: 'red' }}>{ props.children }</h1>,
        table: props =>
            <div style={ styles.tableWrapper }>
                <table className="zui-table zui-table-rounded" style={ styles.table }>{ props.children }</table>
            </div>,
        link: props =>
            <a
                href={ props.href }
                target="_blank"
                style={ styles.link }>{ props.children }</a>,
        list: props =>
            <ul style={ styles.list }>{ props.children }</ul>,
        listItem: props =>
            <li className="foobar">{props.children}</li>,
            //<Li>{ props.children }</Li>,
            //<li style={ styles.listItem }><div style={ styles.bullet }></div>{ props.children }{ console.log(props.children)}</li>,
        paragraph: props => <P>{ props.children }</P>,
        tableCell: props =>
            React.createElement(
                `t${props.isHeader ? 'h' : 'd'}`,
                { style: styles.tableCell },
                props.children),
        heading: props => (
            <div style={ styles.headingWrapper }>
                <div style={ styles.headingsBullet[props.level - 1] }>
                </div>
                <Headings level={ props.level }>{ props.children }</Headings>
            </div>
        ),
        image: ({ src }) =>
            <img
                src={ src }
                onClick={ () => props.updateImgViewerUrl(src)}
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
    useWhiteFont: true,
}

export default connect(contentReduxState, contentReduxDispatch)(BlogPostContent)
