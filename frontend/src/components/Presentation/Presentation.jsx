import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress,
} from '../../reducer/actions/Bg.js'

import { updateLinePosition } from '../../reducer/actions/App.js'

import transitions from './transitions.js'

import {
    H1,
    H2,
} from '../pages/UI.jsx'

const mapStateToProps = state => ({
    routing: state.routing,
})

const mapDispatchToProps = dispatch => ({
    updateFrontBgUrl: url => dispatch(updateFrontBgUrl(url)),
    updateBackBgUrl: url => dispatch(updateBackBgUrl(url)),
    updateFrontBgStyle: style => dispatch(updateFrontBgStyle(style)),
    updateBackBgStyle: style => dispatch(updateBackBgStyle(style)),
    updateTransitionProgress: p => dispatch(updateTransitionProgress(p)),
    goTo: url => dispatch(push(url)),
    updateLinePosition: position => dispatch(updateLinePosition(position)),
})

class SlideTransition extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: this.props.currentPage,
            targetPage: this.props.currentPage,
            currentPageStyle: {},
            targetPageStyle: {},
            transitionProgress: 0,
            transitionDirection: 0,
        }

        this.timer = 0

        this.getOpacityStyles = this.getOpacityStyles.bind(this)
        this.getTranslationStyles = this.getTranslationStyles.bind(this)
        this.updateTimerPointer = this.updateTimerPointer.bind(this)
        this.updateLinePosition = this.updateLinePosition.bind(this)
        this.translateTitle = this.translateTitle.bind(this)
    }

    componentDidMount() {
        // Start transition
        this.updateLinePosition()
    }

    componentWillReceiveProps(newProps) {
        // Check if slide has changed
        if(newProps.currentPage !== this.props.currentPage) {
            this.setState({
                currentPage: this.props.currentPage,
                targetPage: newProps.currentPage,
                transitionProgress: 0,
                transitionDirection: this.props.currentPage > newProps.currentPage ? -1 : 1,
            })
        }

        // Start transition

        const startTime = new Date()
        const deltaTime = 500

        let rafId = 0
        const transitionFunction = () => {
            if(this.state.transitionProgress < 1) {
                const deltaProgress = (new Date() - startTime) / deltaTime - this.state.transitionProgress
                this.setState({
                    transitionProgress: this.state.transitionProgress + deltaProgress > 1 ? 1 : this.state.transitionProgress + deltaProgress,
                })

                rafId = requestAnimationFrame(transitionFunction)
            } else {
                this.setState({
                    transitionProgress: 0,
                    currentPage: this.state.targetPage,
                })
                cancelAnimationFrame(rafId)
            }

        }
        requestAnimationFrame(transitionFunction)

        // Update line position
        this.updateLinePosition(newProps)
    }

    updateLinePosition(props = this.props) {
        this.props.updateLinePosition(props.pages[props.currentPage].linePosition)
    }

    updateTimerPointer(timer) {
        window.clearInterval(this.timer)
        this.timer = timer
    }

    componentDidUpdate() {

    }

    getOpacityStyles() {
        return this.getTranslationStyles()

        const currentSlide = {
        }
        const targetSlide = {
            position: 'absolute',
        }

        return {
            currentSlide: {
                opacity: 1 - this.state.transitionProgress,
                position: 'absolute',
            },
            targetSlide: {
                opacity: this.state.transitionProgress,
                position: 'absolute',
            },
        }
    }

    getTranslationStyles() {
        const currentSlide = {
        }
        const targetSlide = {
            position: 'absolute',
        }

        let currentSlideTransform = 'translateX(-' + this.state.transitionProgress * 100 + 'vw)'
        let targetSlideTransform = 'translateX(calc(100vw - ' + this.state.transitionProgress * 100 + 'vw))'
        if(this.state.transitionDirection < 0) {
            currentSlideTransform = 'translateX(' + this.state.transitionProgress * 100 + 'vw)'
            targetSlideTransform = 'translateX(calc(-100vw + ' + this.state.transitionProgress * 100 + 'vw))'
        }

        return {
            currentSlide: {
                position: 'absolute',
                transform: currentSlideTransform,
            },
            targetSlide: {
                position: 'absolute',
                transform: targetSlideTransform
            },
        }
    }

    getStyles() {
    }

    translateTitle(currentTitle, targetTitle, sign) {
        if(sign >= 0) {
            if(currentTitle !== targetTitle) {
                // translate
                return {
                    transform: 'inherit',
                }
            } else {
                // inverse translate
                return {
                    transform: 'translateX(' + this.state.transitionProgress * 100 + 'vw)'
                }
            }
        } else {
            if(currentTitle !== targetTitle) {
                // translate
                return {
                    transform: 'inherit',
                }
            } else {
                // inverse translate
                return {
                    transform: 'translateX(-' + this.state.transitionProgress * 100 + 'vw)'
                }
            }
        }
    }

    render() {
        const { pages, currentPage } = this.props

        const currentSlideStyle = this.getOpacityStyles().currentSlide
        const targetSlideStyle = this.getOpacityStyles().targetSlide

        const CurrentSlide = this.props.pages[this.state.currentPage].comp
        const TargetSlide = this.props.pages[this.state.targetPage].comp

        const currentH1 = this.props.pages[this.state.currentPage].h1
        const currentH2 = this.props.pages[this.state.currentPage].h2
        const targetH1 = this.props.pages[this.state.targetPage].h1
        const targetH2 = this.props.pages[this.state.targetPage].h2

        const sign = this.state.targetPage - this.state.currentPage
        let translates = {
            H1: this.translateTitle(currentH1, targetH1, sign),
            H2: this.translateTitle(currentH2, targetH2, sign),
        }

        return (
            <div className='slide-transition--wrapper'>
                <div className='current-slide--wrapper' style={ currentSlideStyle }>
                    <H1 style={ translates.H1 }>{ currentH1 }</H1>
                    <H2 style={ translates.H2 }>{ currentH2 }</H2>
                    <CurrentSlide { ...this.props } />
                </div>
                <div className='target-slide--wrapper' style={ targetSlideStyle }>
                    <H1 style={ translates.H1 }>{ targetH1 }</H1>
                    <H2 style={ translates.H2 }>{ targetH2 }</H2>
                    <TargetSlide { ...this.props } />
                </div>
            </div>
        )
    }
}



const PresentationDumb = props => {
    let currentPage = props.currentPage < 0 ? 0 : props.currentPage
    currentPage = currentPage > props.pages.length - 1 ? props.pages.length - 1 : currentPage

    return (
        <SlideTransition { ...props } />
    )
}

class Presentation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
        }

        this.eventCounter = 0

        this.onScroll = this.onScroll.bind(this)
        this.goToNextPage = this.goToNextPage.bind(this)
        this.goToPreviousPage = this.goToPreviousPage.bind(this)
        this.attachScrollEvent = this.attachScrollEvent.bind(this)
        this.detachScrollEvent = this.detachScrollEvent.bind(this)
        this.isFirstPage = this.isFirstPage.bind(this)
        this.isLastPage = this.isLastPage.bind(this)
        this.pathnameToSlideNumber = this.pathnameToSlideNumber.bind(this)
        this.goToPage = this.goToPage.bind(this)
    }

    componentDidMount() {
        // Attach scroll to page change
        this.attachScrollEvent()

        // Deal with urls
    }

    componentWillUnmount() {
        this.detachScrollEvent()
    }

    componentWillUpdate() {
    }

    pathnameToSlideNumber(pathname) {
        return this.props.pages.map((e, i) => pathname === e.path ? i : -1).filter(e => e >= 0)[0]
    }

    componentWillReceiveProps(nextProps) {
        const currentPathname = this.props.routing.location.pathname
        const nextPathname = nextProps.routing.location.pathname

        if(currentPathname !== nextPathname) {
            const nextSlide = this.pathnameToSlideNumber(nextPathname)

            this.goToPage(nextSlide)
        }
    }

    goToPage(targetPage) {
        const { currentPage } = this.state
        const { pages } = this.props

        if(targetPage !== currentPage) {
            const sign = targetPage > currentPage ? 1 : -1
            const _pages = [pages[currentPage], pages[targetPage]]
            const pages2 = sign < 0 ? _pages.reverse() : _pages

            const transitionParams = {
                sign,
                pages: pages2,
                currentPage: sign > 0 ? 0 : 1,
                attachScrollEvent: this.attachScrollEvent,
                detachScrollEvent: this.detachScrollEvent,
            }

            const transitionType = transitions.types.BG_SPLIT

            transitions.startTransition(transitionType, transitionParams)

            this.setState({ currentPage: targetPage })
        }
    }

    /*
       Returns true if currentPage is first page in pages array
    **/
    isFirstPage() {
        return this.state.currentPage === 0 ? true : false
    }

    /*
       Returns true if currentPage is last page in pages array
    **/
    isLastPage() {
        return this.state.currentPage === this.props.pages.length - 1 ? true : false
    }

    /*
       Goes to next slide
    **/
    goToNextPage() {
        // Get next page
        const { currentPage } = this.state
        let nextPage = currentPage + 1

        // Boundary conditions
        const totalPages = this.props.pages.length
        nextPage = nextPage >= totalPages ? totalPages - 1 : nextPage

        // Background transitions
        const transitionParams = {
            sign: 1,
            pages: this.props.pages,
            currentPage,
            attachScrollEvent: this.attachScrollEvent,
            detachScrollEvent: this.detachScrollEvent,
        }

        const transitionType = this.props.pages[currentPage].transitions.nextSlide.bg

        transitions.startTransition(transitionType, transitionParams)

        // Update state
        this.setState({ currentPage: nextPage })
    }

    /*
       Goes to previous slide
    **/
    goToPreviousPage() {
        // Get previous page
        const { currentPage } = this.state
        let previousPage = currentPage - 1

        // Boundary conditions
        previousPage = previousPage < 0 ? 0 : previousPage

        // Background transitions
        const transitionParams = {
            sign: -1,
            pages: this.props.pages,
            currentPage,
            attachScrollEvent: this.attachScrollEvent,
            detachScrollEvent: this.detachScrollEvent,
        }

        const transitionType = this.props.pages[currentPage].transitions.previousSlide.bg

        transitions.startTransition(transitionType, transitionParams)

        // Update state
        this.setState({ currentPage: previousPage })
    }

    /*
       Attach wheel event to page change
    **/
    attachScrollEvent() {
        this.detachScrollEvent()

        if(this.props.attachToMouseScroll) {
            window.addEventListener("wheel", this.onScroll)
            this.eventCounter++
        }
    }

    /*
       Detach wheel event from page change
    **/
    detachScrollEvent() {
        let i = 0
        for(i = 0; i < this.eventCounter; i++) {
            window.removeEventListener("wheel", this.onScroll)
        }

        this.eventCounter = this.eventCounter - i
    }

    /*
       Change slide on user scroll
    **/
    onScroll(e) {
        const sign = e.deltaY

        const totalPages = this.props.pages.length
        const { currentPage } = this.state

        if(sign > 0)
            this.goToNextPage()
        else if(sign < 0)
            this.goToPreviousPage()
    }


    render() {

        return (
            <PresentationDumb
                { ...this.props }
                currentPage={ this.state.currentPage }
            />
        )
    }
}

Presentation.defaultProps = {
    attachToMouseScroll: true,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)
