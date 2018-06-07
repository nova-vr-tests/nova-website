import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import URLSearchParams from 'url-search-params'

import SocialButtons from './SocialButtons.jsx'

import { styles as appStyles } from '../../constants.js'

import getStyles, {
} from './BlogStyles.jsx'

import API from '../../API.js'

import BlogPostContent from '../MarkdownParser/MarkdownParser.jsx'

import Picto from './HeaderPicto.jsx'


const mapStateToProps = state => ({
    routing: state.routing,
    currentPage: state.appReducer.currentPage,
    pages: state.appReducer.pages,
})

const mapDispatchToProps = () => ({
})

const Header = props => {
    const styles = {
        wrapper: {
            minHeight: `calc(6 * ${appStyles.unitHeight})`,
            color: 'black',
            display: 'flex',
            alignItems: 'flex-end',
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: `calc(1 * ${appStyles.unitWidth})`,
            justifyContent: 'flex-end',
            color: '#545454',
            position: 'relative',
            flex: 1,
            height: `calc(4 * ${appStyles.unitHeight})`,
        },
        h1: {
            fontSize: '1.8rem',
            margin: 0,
            marginBottom: `calc(3 * ${appStyles.unitHeight})`,
            transform: 'translateY(50%)',
            color: 'white',
            fontWeight: 'normal',
            letterSpacing: '0.05rem',
            width: '90%',
            fontFamily: 'TTNorms-medium',
        },
    }

    return (
        <div
            style={ styles.wrapper }
            className="Header--wrapper">
            <Picto url={ props.pictoUrl } />
            <div style={ styles.textWrapper}>
                <h1 style={ styles.h1 }>{ props.title }</h1>
                <SocialButtons />
            </div>
        </div>
    )
}

Header.defaultProps = {
    title: '',
    pictoUrl: '',
}

const ContentWrapper = props => {
    const { clientWidth } = document.documentElement
    const { unitHeight } = appStyles

    let height = `calc(100vh - 11 * ${unitHeight})`
    let backgroundColor = 'rgba(255, 255, 255, 0.6)'
    let color = 'black'

    if(clientWidth < appStyles.mediaQueries.phone || props.sidePanelMode) {
        height = '100%'
    }

    if(props.sidePanelMode) {
        backgroundColor = 'rgba(0, 0, 0, 0)'
        color = 'white'
    }

    const styles = {
        articleWrapper: {
            backgroundColor,
            height,
            boxSizing: 'border-box',
            color,
            display: 'flex',
            flexDirection: 'column',
            borderTopLeftRadius: '20px',
            overflow: 'hidden',
        }
    }

    return (
        <div style={ styles.articleWrapper }>
          { props.children }
        </div>
    )
}

const Blog = props => {
    const styles = getStyles(props)

    const title = props.blogPost.title
    const content = props.blogPost[props.contentKey]

    const { LastComp } = props

    const squarePictoUrl = props.blogPost.squarePicto ? new URL(props.blogPost.squarePicto) : {origin: '', pathname: ''}
    const pictoUrl = props.blogPost.picto ? new URL(props.blogPost.picto) : {origin: '', pathname: ''}
    const headerPictoUrl = squarePictoUrl.origin + squarePictoUrl.pathname === '' ? pictoUrl : squarePictoUrl

    return (
        <div
            style={ styles.wrapper }
            className="Blog--wrapper">
            <div style={ styles.headerWrapper }>
                <Header
                    pictoUrl={ props.auth ? pictoUrl.origin + pictoUrl.pathname : headerPictoUrl.origin + headerPictoUrl.pathname }
                    title={ title } />
            </div>
            <ContentWrapper sidePanelMode={ props.sidePanelMode }>
                <BlogPostContent
                    addTail={ props.addTail }
                    useWhiteFont={ props.sidePanelMode }
                    content={ content } />
                <LastComp
                    pictoUrl={ props.auth ? pictoUrl.origin + pictoUrl.pathname : headerPictoUrl.origin + headerPictoUrl.pathname }
                    title={ title } />
            </ContentWrapper>
        </div>
    )
}

Blog.defaultProps = {
    showHeader: true,
    contentKey: 'content',
    LastComp: () => <div></div>,
    sidePanelMode: false,
    addTail: true,
}

let postId = 1
const fetchBlogPost = async (fetchUrl, setBlogPost, that) => {
    const restApi = new API()
    if(window.location.search.length) {
        postId  = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)
    }

    let blogPost
    if(that.props.auth) {
        blogPost = await restApi.fetchDetailAuth(fetchUrl, postId, that.props.password)
    } else {
        blogPost = await restApi.fetchDetail(fetchUrl, postId)
    }

    if(that.mounted) {
        setBlogPost(blogPost)
    }
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
            this.page = this.props.currentPage
            const shouldRender = this.props.pages[this.page].path.replace("/","") === this.props.routing.location.pathname.replace("/", "")
            if(shouldRender) {
                fetchBlogPost(this.props.fetchUrl, this.props.setBlogPost, this)
            }
        },
        componentWillUpdate(nextProps) {
            const shouldRender = this.props.pages[this.page].path.replace("/","") === this.props.routing.location.pathname.replace("/", "")
            if(shouldRender && this.props.routing.location.search !== nextProps.routing.location.search) {
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
    auth: false, // should use auth when fetching content
    password: '', // password for auth, only userd if props.auth = true
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export {
    ContentWrapper,
}

export default ConnectedComp
