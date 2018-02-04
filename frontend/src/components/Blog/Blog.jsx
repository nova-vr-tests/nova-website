import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import SlideHeader from '../Presentation/SlideHeader/SlideHeader.jsx'

import { BG as PanelBg } from '../Presentation/SidePanel/SidePanel.jsx'

import getStyles, {
} from './BlogStyles.jsx'

import API from '../../API.js'

const ReactMarkdown = require('react-markdown')

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
})

const BlogPostContent = props => {
    return <ReactMarkdown source={ props.content } />
}

const Blog = props => {
    const styles = getStyles(props)

    const title = props.blogPost.title
    const content = props.blogPost.content

    let BlogPostHeader = () => <div></div>

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
                    widthCoef={ 15 } />
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
        const url = new URL(window.location.href)
        postId = parseInt(url.searchParams.get("post"))
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
            console.log(this.props, this.props.fetchUrl)
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
)(Blog)

SmartComp.defaultProps = {
    fetchUrl: new API().urls.blogPosts.list,
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
