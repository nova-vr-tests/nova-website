import React from 'react'
import {
    compose,
    lifecycle,
    withState,
} from 'recompose'

import getStyles from './SlideHeaderStyles.jsx'
import Social from '../Social/Social.jsx'

const SlideHeader = props => {
    const styles = getStyles('2rem')

    const title0Styles = {
        ...styles.title,
        opacity: !props.currentPage  ? 1 : 0,
        display: props.windowWidth < 1000 ? 'block' : 'none',
    }

    const title1Styles = {
        ...styles.title,
        opacity: props.opacity1 ? 1 : 0,
    }

    const title2Styles = {
        ...styles.title,
        opacity: props.opacity2 ? 1 : 0,
    }



    return (
        <div style={ styles.wrapper }>
            <div style={ styles.titleWrapper }>
                <h2
                    className="above"
                    style={ title0Styles }>
                    Nova XR Media
                </h2>
                <h2
                    className="above"
                    style={ title1Styles }>
                    { props.title1 }
                </h2>
                <h2
                    className="above"
                    style={ title2Styles }>
                    { props.title2 }
                </h2>
            </div>
            <div style={ styles.socialWrapper }>
                <Social
                    shareUrl={ props.currentUrl } />
            </div>
        </div>
    )
}

function componentWillUpdate(nextProps, nextState) {
    // title changed
    if(nextProps.title !== this.props.title) {
        // if title1 is currently shown
        if(this.props.opacity1) {
            // update title2
            this.props.setTitle2(nextProps.title)

            // update opacities
            this.props.setOpacity1(false)
            this.props.setOpacity2(true)
        } else {
            // update title1
            this.props.setTitle1(nextProps.title)

            // update opacities
            this.props.setOpacity1(true)
            this.props.setOpacity2(false)
        }
    }
}

const SlideHeaderSmart = compose(
    withState(
        'title1',
        'setTitle1',
        '',
    ),
    withState(
        'title2',
        'setTitle2',
        '',
    ),
    withState(
        'opacity1',
        'setOpacity1',
        false,
    ),
    withState(
        'opacity2',
        'setOpacity2',
        false,
    ),
    lifecycle({
        componentWillUpdate(nextProps, nextState) {
            componentWillUpdate.bind(this)(nextProps, nextState)
        },
    })
)(SlideHeader)

export default SlideHeaderSmart
