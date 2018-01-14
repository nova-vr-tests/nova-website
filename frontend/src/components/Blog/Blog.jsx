import React from 'react'

import SlideHeader from '../Presentation/SlideHeader/SlideHeader.jsx'

import { BG as PanelBg } from '../Presentation/SidePanel/SidePanel.jsx'

import getStyles, {
} from './BlogStyles.jsx'

const Blog = props => {
    const styles = getStyles(props)

    const { Content } = props

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
            <SlideHeader />
            <div style={ styles.articleWrapper }>
                Hello
            </div>
        </div>
    )
}

Blog.defaultProps = {
}

export default Blog
