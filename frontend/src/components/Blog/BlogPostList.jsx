import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import API from '../../API.js'

import { push } from 'react-router-redux'

import getStyles, {
} from './BlogPostListStyles.jsx'

import SidePanelDrawer from '../UI/SidePanelDrawer.jsx'
import BlogPost from './Blog.jsx'

import { styles as appStyles } from '../../constants.js'

import URLSearchParams from 'url-search-params'

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
    goTo: url => dispatch(push(url)),
})


const BlogPostList = props => {
    const styles = getStyles(props)

    const List = () => props.blogPosts.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 70) + '...'
        }

        const active = parseInt(new URLSearchParams(new URL(document.location.href).search).get('post')) === e.id

        const wrapperStyle = {
            ...styles.linkWrapper,
            ...(active ? styles.activeLink : {})
        }
        const onClickCallback = () => props.goTo(`${window.location.pathname}?post=${e.id}`)

        const pictoUrl = new URL(e.picto)
        const filteredPictoUrl = pictoUrl.origin + pictoUrl.pathname
        return (
            <div
                style={ wrapperStyle }
                onClick={ onClickCallback }
                className="blog-link--wrapper"
                key={ i }>
                <img
                    src={ filteredPictoUrl }
                    alt="picto"
                    style={ styles.picto } />
                <div style={ styles.textWrapper }>
                    <div style={ styles.title }>
                        { e.title }
                    </div>
                    <div style={ styles.content }>
                        { content }
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div
            style={ styles.wrapper }
            className="BlogPostList--wrapper">
            <SidePanelDrawer
                comps={[
                    () => <div style={ styles.listWrapper }><List /></div>,
                    () => [
                        <span
                            key={ 1 }
                            onClick={ () => props.goTo(window.location.pathname) }> Test </span>,
                        <BlogPost
                            key={ 2 }
                            fetchUrl={ props.fetchUrl }
                            showHeader={ false } /> ,
                    ]
                ]}
                position={ props.drawerPosition }
            />
        </div>
    )
}

BlogPostList.defaultProps = {
}

const initialState = {
    blogPosts: [],
}

const fetchBlogPosts = async (url, setBlogPosts, that) => {
    const restApi = new API()
    const blogPosts = await restApi.fetch(url)

    if(that.mounted) {
        setBlogPosts(blogPosts)
    }
}

const updateDrawerFromUrl = (setDrawerPosition, urlGetParam) => {
    if(urlGetParam === '') {
        setDrawerPosition(0)
    } else {
        setDrawerPosition(1)
    }
}

const SmartComp = compose(
    withState(
        'blogPosts',
        'setBlogPosts',
        [],
    ),
    withState(
        'drawerPosition',
        'setDrawerPosition',
        0,
    ),
    lifecycle({
        componentDidMount() {
            this.mounted = true
            fetchBlogPosts(
                this.props.fetchUrl, this.props.setBlogPosts, this)
            updateDrawerFromUrl(
                this.props.setDrawerPosition,
                this.props.routing.location.search)
        },
        componentWillUpdate(nextProps) {
            if(this.props.routing.location.search !== nextProps.routing.location.search) {
                updateDrawerFromUrl(
                    this.props.setDrawerPosition,
                    nextProps.routing.location.search)
            }
        },
        componentWillUnmount() {
            this.mounted = false
        }
    })
)(BlogPostList)

SmartComp.defaultProps = {
    fetchUrl: new API().urls.blogPosts.list,
}

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
