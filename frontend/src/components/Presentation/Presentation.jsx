import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress,
    updateFrontLayers,
    updateBackTransitions,
} from '../../reducer/actions/Bg.js'

import { updateLinePosition } from '../../reducer/actions/App.js'

import transitions from './transitions.js'

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
                    currentPage: this.state.targetPage,
                })

                rafId = requestAnimationFrame(transitionFunction)
            } else {
                this.setState({ transitionProgress: 0 })
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

    render() {
        const { pages, currentPage } = this.props

        const currentSlideStyle = this.getOpacityStyles().currentSlide
        const targetSlideStyle = this.getOpacityStyles().targetSlide

        const CurrentSlide = this.props.pages[this.state.currentPage].comp
        const TargetSlide = this.props.pages[this.state.targetPage].comp

        return (
            <div className='slide-transition--wrapper'>
                <div className='current-slide--wrapper' style={ currentSlideStyle }>
                    <CurrentSlide { ...this.props } />
                </div>
                <div className='target-slide--wrapper' style={ targetSlideStyle }>
                    <TargetSlide { ...this.props } />
                </div>
            </div>
        )
    }
}



const PresentationDumb = props => {
    let currentPage = props.currentPage < 0 ? 0 : props.currentPage
    currentPage = currentPage > props.pages.length - 1 ? props.pages.length - 1 : currentPage

    const Comp = props.pages[currentPage].comp

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
    }

    componentDidMount() {
        // Attach scroll to page change
        this.attachScrollEvent()

        // Deal with urls
    }

    componentWillUnmount() {
        this.detachScrollEvent()
    }

    componentWillUpdate(nextProps) {
    }

    componentWillReceiveProps() {
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
