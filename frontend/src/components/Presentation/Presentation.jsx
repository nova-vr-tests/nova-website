import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress
} from '../../reducer/actions/Bg.js'

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
    updateFrontBgUrl: url => dispatch(updateFrontBgUrl(url)),
    updateBackBgUrl: url => dispatch(updateBackBgUrl(url)),
    updateFrontBgStyle: style => dispatch(updateFrontBgStyle(style)),
    updateBackBgStyle: style => dispatch(updateBackBgStyle(style)),
    updateTransitionProgress: p => dispatch(updateTransitionProgress(p)),
})

const PresentationDumb = props => {
    const Comp = props.pages[props.currentPage].comp
    return (
        <Comp />
    )
}


class Presentation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            scrollY: 0,
        }

        this.onScroll = this.onScroll.bind(this)
        this.getPageFromScroll = this.getPageFromScroll.bind(this)
        this.updateBackgrounds = this.updateBackgrounds.bind(this)
    }

    componentDidMount() {
        // load new background image

        // attach scroll event
        window.addEventListener("wheel", this.onScroll)
    }

    componentWillUnmount() {
        // unsubscribe scroll event
        window.removeEventListener("wheel", this.onScroll)
    }

    onScroll(e) {
        console.log(e)
        // update state scrollY

        // check if next slide has background

            // handle next slide

        const newY = this.state.scrollY + e.deltaY
        const newY2= newY >= 0 ? newY : 0
        const scrollY = newY2 > document.documentElement.clientHeight * (this.props.pages.length) ? this.state.scrollY : newY2

        this.setState({
            scrollY,
        })

        this.props.updateFrontBgUrl(this.props.pages[this.getPageFromScroll()].bgUrl)
        this.updateBackgrounds()
    }

    updateBackgrounds() {
        const currentPage = this.getPageFromScroll()
        const previousPage = currentPage - 1 < 0 ? 0 : currentPage
        const nextPage = currentPage + 1 > this.props.pages.length - 1 ? this.props.pages.length - 1 : currentPage + 1

        this.props.updateFrontBgUrl(this.props.pages[nextPage].bgUrl)
        this.props.updateBackBgUrl(this.props.pages[currentPage].bgUrl)

        const { clientHeight } = document.documentElement
        const opacity = (this.state.scrollY % clientHeight) / clientHeight

        this.props.updateFrontBgStyle({ opacity: opacity * 2 })
        this.props.updateTransitionProgress(opacity < 0.5 ? 0 : (opacity - 0.5) * 2)
    }

    getPageFromScroll() {
        const windowHeight = document.documentElement.clientHeight
        const currentPage = Math.floor(this.state.scrollY / windowHeight)

        return currentPage
    }


    render() {
        return (
            <PresentationDumb
                { ...this.props }
                currentPage={ this.getPageFromScroll() }
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)
