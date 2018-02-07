import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import URLSearchParams from 'url-search-params'

import SlideHeader from '../Presentation/SlideHeader/SlideHeader.jsx'

import { BG as PanelBg } from '../Presentation/SidePanel/SidePanel.jsx'

import { styles as appStyles } from '../../constants.js'

import getStyles, {
    getBlogPostContentStyles,
} from './BlogStyles.jsx'

import API from '../../API.js'

const ReactMarkdown = require('react-markdown')

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
})

const contentReduxState = state => ({
    windowWidth: state.appReducer.windowWidth,
})

const _BlogPostContent = props => {
    const styles = getBlogPostContentStyles(props)

    const renderers = {
        root: props => <div style={ styles.root }>{ props.children }</div>,
        h1: props => <h1 style={{ color: 'red' }}>{ props.children }</h1>,
        table: props => <table style={ styles.table }>{ props.children }</table>,
        link: props => <a href={ props.href } style={ styles.link }>{ props.children }</a>,
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

const BlogPostContent = connect(contentReduxState)(_BlogPostContent)

const Blog = props => {
    const styles = getStyles(props)

    const title = props.blogPost.title
    const content = props.blogPost.content

    let BlogPostHeader = () => <div></div>

    const { clientWidth } = document.documentElement
    const { unitWidthJs, sidebar, sidePanel } = appStyles
    const widthCoef = clientWidth / unitWidthJs - (2 * sidebar.widthFactor + sidePanel.openedWidthCoef)

    return (
        <div
            style={ styles.wrapper }
            className="Blog--wrapper">
            <div style={ styles.headerWrapper }>
                <PanelBg
                    zIndex={ -1 }
                    bgColor="rgba(255, 255, 255, 1)"
                    type={ 1 }
                    rightEdgeCoef={ 11 }
                    widthCoef={ widthCoef } />
                <SlideHeader
                    title={ title }
                    fontColor="rgba(0, 0, 0, 1)" />
            </div>
            <div style={ styles.articleWrapper }>
                <BlogPostContent content={ content } />
            </div>
        </div>
    )
}

Blog.defaultProps = {
    showHeader: true,
}

const initialState = {
    blogPost: {
        title: '',
        content: <div></div>,
    },
}

const fetchBlogPost = async (fetchUrl, setBlogPost, that) => {
    const restApi = new API()
    let postId = 1
    if(window.location.search.length) {
        postId  = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'))
    }

    const blogPost = await restApi.fetchDetail(fetchUrl, postId)

    if(that.mounted)
        setBlogPost(blogPost)
}

const SmartComp = compose(
    withState(
        'blogPost',
        'setBlogPost',
        {},
    ),
    lifecycle({
        componentDidMount() {
            this.mounted = true
            fetchBlogPost(
                this.props.fetchUrl, this.props.setBlogPost, this)
        },
        componentWillUpdate(nextProps) {
            if(this.props.routing.location.search !== nextProps.routing.location.search) {
                fetchBlogPost(
                    this.props.fetchUrl, this.props.setBlogPost, this)
            }
        },
        componentWillUnmount() {
            this.mounted = false
        }
    }),
)(connect(
    state => ({
        windowWidth: state.appReducer.windowWidth,
        windowHeight: state.appReducer.windowHeight,
    })
)(Blog))

SmartComp.defaultProps = {
    fetchUrl: new API().urls.blogPosts.list,
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
