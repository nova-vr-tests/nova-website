import React from 'react'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'
import { PassWindowWidth } from '../HOC/HOC.jsx'

import { styles as appStyles } from '../../constants.js'
import getStyles from './MarkdownParserStyles.jsx'

import './styles.css'

import {
    updateImgViewerUrl,
    updateImgViewerIsOpened,
} from '../../reducer/actions/App.js'

import { Link } from 'react-router-dom'

const contentReduxState = () => ({
})

const contentReduxDispatch = dispatch => ({
    updateImgViewerUrl: url => dispatch(updateImgViewerUrl(url)),
    updateImgViewerisOpened: isOpened => dispatch(updateImgViewerIsOpened(isOpened)),
})

const YTPlayer = props => {
    const styles = {
        wrapper: {
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '56.25%',
        },
        video: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
    }

    return (
        <div style={ styles.wrapper }>
            <iframe style={ styles.video } width="560" height="315" src={ props.src } frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
    )
}

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

            if(props.children[0].length === 5) {
                if(props.children[0].substring(0, 5) === "!YT! ") {
                    const src = props.children[1].props.href
                    return <YTPlayer src={ src } />
                }
            }
        }

        return (
            <p style={ styles.p }>{ props.children }</p>
        )
    }

    const Img = props => {
        const style = {
            cursor: 'pointer',
            minWidth: props.windowWidth < appStyles.mediaQueries.phone ? `100vw` : `calc(${window.screen.width}px / 3)`,
            marginLeft: `-30px`,
            boxSizing: 'border-box',
        }
        return <img
            alt={ props.alt }
            onClick={ props.onClick }
            style={ style }
            src={ props.src } />
    }
    const ImageAutoResize = PassWindowWidth(Img)

    const NovaLink = props => {
        if(props.href.includes(window.location.origin)) {
            const getDiff = (string, diffBy) => string.split(diffBy).join('')
            return <Link to={ getDiff(props.href, window.location.origin) } style={ styles.link }>{ props.children }</Link>
        } else {
            return <a
                target="_blank"
                href={ props.href }
                style={ styles.link }>{ props.children }</a>
        }
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
            <NovaLink {...props} />,
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
            <ImageAutoResize
                src={ src }
                onClick={ () => props.updateImgViewerUrl(src)}
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
