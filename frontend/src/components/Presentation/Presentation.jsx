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
    let currentPage = props.currentPage < 0 ? 0 : props.currentPage
    currentPage = currentPage > props.pages.length - 1 ? props.pages.length - 1 : currentPage

    const Comp = props.pages[currentPage].comp
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
        this.animateProgress = this.animateProgress.bind(this)
        this.getPageHeights = this.getPageHeights.bind(this)
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

    componentWillUpdate() {
        this.updateBackgrounds()
    }

    onScroll(e) {
        // update state scrollY

        // check if next slide has background

            // handle next slide

        const newY = this.state.scrollY + e.deltaY
        const newY2= newY >= 0 ? newY : 0
        const scrollY = newY2 > document.documentElement.clientHeight * (this.props.pages.length) ? this.state.scrollY : newY2

        if(e.deltaY < 0 || this.state.scrollY < this.getPageHeights()[this.props.pages.length - 1][0])
            this.setState({
                scrollY,
            })

        this.props.updateFrontBgUrl(this.props.pages[this.getPageFromScroll()].bgUrl)
        this.updateBackgrounds()

        if(
            this.state.scrollY % document.documentElement.clientHeight > 0.5 * document.documentElement.clientHeight &&
            !this.transitionTimer &&
            Math.floor(this.props.scrollY / document.documentElement.clientHeight) !== this.props.pages.length - 1
        ) {
            this.animateProgress(e.deltaY > 0 ? 1 : -1)
        }
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
        this.props.updateTransitionProgress(opacity < 0.5 ? 0 :  (opacity - 0.5) * 2)

    }

    getPageHeights() {
        return this.props.pages.map((e, i) => [i * document.documentElement.clientHeight, '/path'])
    }

    animateProgress(sign) {
        const currentPage = Math.floor(this.state.scrollY / document.documentElement.clientHeight)
        window.removeEventListener("wheel", this.onScroll)


        const targetPage = sign > 0 ?
                           (currentPage + 1 > this.props.pages.length - 1 ? this.props.pages.length - 1 : currentPage + 1)
                         :
                           currentPage
        const targetPageHeight = this.getPageHeights()[targetPage][0]

        const offset = 4



        this.transitionTimer = window.setInterval(() => {
            const currentPageHeight = this.state.scrollY

            const condition = sign > 0 ? currentPageHeight > targetPageHeight : currentPageHeight < targetPageHeight

            //if(this.state.scrollY % document.documentElement.clientHeight < document.documentElement.clientHeight / 2) {
            if(
                condition ||
                this.state.scrollY < 1 ||
                this.state.scrollY > document.documentElement.clientHeight * this.props.pages.length
            ) {
                window.clearInterval(this.transitionTimer)
                this.transitionTimer = undefined
                window.addEventListener("wheel", this.onScroll)

                this.setState({ scrollY: targetPageHeight   })

                if(this.state.scrollY < 0)
                    this.setState({ scrollY: 0 })
                else if(this.state.scrollY > document.documentElement.clientHeight * this.props.pages.length)
                    this.setState({ scrollY: document.documentElement.clientHeight * this.props.pages.length - 10 })
            } else {
                this.setState({ scrollY: this.state.scrollY + offset * sign })
            }

        }, 5)
    }

    getPageFromScroll() {
        const windowHeight = document.documentElement.clientHeight
        let currentPage = Math.floor(this.state.scrollY / windowHeight)
        currentPage = currentPage < 0 ? 0 : currentPage
        currentPage = currentPage > this.props.pages.length - 1 ? this.props.pages.length - 1 : currentPage

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
