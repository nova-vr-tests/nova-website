import React from 'react'

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

const Blog = props => {
    const styles = getStyles(props)

    const { Content } = props

    let title =''
    let content = <div></div>
    if(props.blogPosts.length > 0) {
        title = props.blogPosts[0].title
        content = props.blogPosts[0].content
    }

    return (
        <div
            style={ styles.wrapper }
            className="Blog--wrapper">
            <PanelBg
                zIndex={ -1 }
                bgColor="rgba(255, 255, 255, 1)"
                type={ 1 }
                rightEdgeCoef={ 11 }
                widthCoef={ 15 } />
            <SlideHeader
                title={ title }
                fontColor="rgba(0, 0, 0, 1)" />
            <div style={ styles.articleWrapper }>
                <ReactMarkdown source={ content } />
            </div>
        </div>
    )
}

Blog.defaultProps = {
}

const initialState = {
    blogPosts: [],
}

const fetchBlogPosts = async (setBlogPosts) => {
    const restApi = new API()
    const blogPosts = await restApi.fetchBlogPosts()

    console.log(blogPosts, 'fetchBlogPosts')

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
            console.log(this.props)
            fetchBlogPosts(this.props.setBlogPosts)
        },
    }),
)(Blog)

export default SmartComp
