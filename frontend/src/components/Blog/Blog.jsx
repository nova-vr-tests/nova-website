import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import facebookIcon from '../img/social/facebook.svg'
import twitterIcon from '../img/social/twitter.svg'
import linkedinIcon from '../img/social/linkedin.svg'

import URLSearchParams from 'url-search-params'


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
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: `calc(1 * ${appStyles.unitWidth})`,
            justifyContent: 'flex-end',
            color: '#545454',
            position: 'relative',
            flex: 1,
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
        },
        picto: {
            height: `calc(5 * ${appStyles.unitHeight})`,
            width: `calc(5 * ${appStyles.unitHeight})`,
        },
        socialWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            opacity: '0.4',
            position: 'absolute',
            bottom: `calc(2 * ${appStyles.unitHeight})`,
            transform: 'translateY(100%)',
            height: `calc(1.25 * ${appStyles.unitHeight})`,
            width: `calc(2.25 * ${appStyles.unitWidth})`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRight: 'none',
            borderTopLeftRadius: '1.2rem',
            borderBottomLeftRadius: '1.2rem',
            right: '0',
            padding: '0 0.8rem',
            boxSizing: 'border-box',
        },
        img: {
            height: `calc(0.6 * ${appStyles.unitHeight})`,
            width: `calc(0.6 * ${appStyles.unitHeight})`,
        }
    }

    return (
        <div
            style={ styles.wrapper }
            className="Header--wrapper">
            <Picto url={ props.pictoUrl } />
            <div style={ styles.textWrapper}>
                <h1 style={ styles.h1 }>{ props.title }</h1>
                <div style={ styles.socialWrapper }>
                    <img
                        style={ styles.img }
                        alt="FB"
                        src={ facebookIcon } />
                    <img
                        style={ styles.img }
                        alt="LI"
                        src={ linkedinIcon } />
                    <img
                        style={ styles.img }
                        alt="TW"
                        src={ twitterIcon } />
                </div>
            </div>
        </div>
    )
}

Header.defaultProps = {
    title: '',
    pictoUrl: '',
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
                    pictoUrl={ headerPictoUrl.origin + headerPictoUrl.pathname }
                    title={ title } />
            </div>
            <div style={ styles.articleWrapper }>
                <BlogPostContent
                    addTail={ props.addTail }
                    content={ content } />
                <LastComp
                    pictoUrl={ squarePictoUrl.origin + squarePictoUrl.pathname }
                    title={ title } />
            </div>
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

    const blogPost = await restApi.fetchDetail(fetchUrl, postId)

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
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
