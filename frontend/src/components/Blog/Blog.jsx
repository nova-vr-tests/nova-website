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

import { BG as PanelBg } from '../Presentation/SidePanel/SidePanel.jsx'

import { styles as appStyles } from '../../constants.js'

import getStyles, {
} from './BlogStyles.jsx'

import API from '../../API.js'

import BlogPostContent from '../MarkdownParser/MarkdownParser.jsx'

import Picto from './HeaderPicto.jsx'


const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
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
            marginLeft: `calc(7 * ${appStyles.unitHeight})`,
            //justifyContent: 'center',
        },
        h1: {
            fontSize: '1.8rem',
            marginBottom: '2rem',
            marginTop: `calc(0.4 * ${appStyles.unitHeight})`,
        },
        picto: {
            height: `calc(5 * ${appStyles.unitHeight})`,
            width: `calc(5 * ${appStyles.unitHeight})`,
        },
        socialWrapper: {
            display: 'flex',
            width: '6rem',
            justifyContent: 'space-between',
        },
        img: {
            height: '1.3rem',
            width: '1.3rem',
            filter: 'invert(100%)',
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
                        src={ facebookIcon } />
                    <img
                        style={ styles.img }
                        src={ linkedinIcon } />
                    <img
                        style={ styles.img }
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

    const { clientWidth } = document.documentElement
    const { unitWidthJs, sidebar, sidePanel } = appStyles
    const widthCoef = clientWidth / unitWidthJs - (2 * sidebar.widthFactor + sidePanel.openedWidthCoef)

    const { LastComp } = props

    const squarePictoUrl = props.blogPost.squarePicto ? new URL(props.blogPost.squarePicto) : {origin: '', pathname: ''}
    const pictoUrl = props.blogPost.picto ? new URL(props.blogPost.picto) : {origin: '', pathname: ''}
    const headerPictoUrl = squarePictoUrl.origin + squarePictoUrl.pathname === '' ? pictoUrl : squarePictoUrl

    return (
        <div
            style={ styles.wrapper }
            className="Blog--wrapper">
            <div style={ styles.headerWrapper }>
                <PanelBg
                    zIndex={ -1 }
                    bgColor="rgba(255, 255, 255, 1)"
                    type={ 1 }
                    rightEdgeCoef={ sidePanel.openedWidthCoef }
                    widthCoef={ widthCoef } />
                <Header
                    pictoUrl={ headerPictoUrl.origin + headerPictoUrl.pathname }
                    title={ title } />
            </div>
            <div style={ styles.articleWrapper }>
                <BlogPostContent content={ content } />
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
}

const fetchBlogPost = async (fetchUrl, setBlogPost, that) => {
    const restApi = new API()
    let postId = 1
    if(window.location.search.length) {
        postId  = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post'), 10)
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
