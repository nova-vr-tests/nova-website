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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    goTo: url => dispatch(push(url)),
})

const BlogPostList = props => {
    const styles = getStyles(props)

    const list = props.blogPosts.map((e, i) => {
        let { content } = e
        if(content.length > 100) {
            content = content.substring(0, 100)
        }

        const active = parseInt(new URL(window.location.href).searchParams.get('post')) === e.id

        return (
            <div
                style={ { ...styles.linkWrapper, ...(active ? styles.activeLink : {}) } }
                onClick={ () => props.goTo(`/blog?post=${e.id}`)}
                className="blog-link--wrapper"
                key={ i }>
                <div style={ styles.title }>
                    { e.title }
                </div>
                <div style={ styles.content }>
                    { content }
                </div>
            </div>
        )
    })

    return (
        <div
            style={ styles.wrapper }
            className="BlogPostList--wrapper">
            { list }
        </div>
    )
}

BlogPostList.defaultProps = {
}

const initialState = {
    blogPosts: [],
}

const fetchBlogPosts = async (setBlogPosts) => {
    const restApi = new API()
    const blogPosts = await restApi.fetchBlogPostList()

    setBlogPosts(blogPosts)
}

const SmartComp = compose(
    withState(
        'blogPosts',
        'setBlogPosts',
        [],
    ),
    lifecycle({
        componentDidMount() {
            fetchBlogPosts(this.props.setBlogPosts)
        },
    })
)(BlogPostList)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
