import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom';

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress
} from '../../reducer/actions/Bg.js'

import store from '../../store.js'
const dispatch = store.dispatch

const transitions = { splitBackground: {} }

/*
    Updates the backgrounds between slides prior to the slide transition
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
**/
transitions.splitBackground.updateBackgroundUrls = (sign, pages, currentPage) => {
    const totalPages = pages.length

    const previousPage = currentPage - 1 < 0 ? 0 : currentPage - 1
    const nextPage = currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1

    const frontBgUrl = sign < 0 ? pages[currentPage].bgUrl : pages[nextPage].bgUrl
    const backBgUrl = sign < 0 ? pages[previousPage].bgUrl : pages[currentPage].bgUrl

    dispatch(updateFrontBgUrl(frontBgUrl))
    dispatch(updateBackBgUrl(backBgUrl))
}

/*
    Reset background styles so next transition appears smoothly
    - param sign {number} positive for next slide and negative for previous slide
**/
transitions.splitBackground.resetBackgroundStyles = (sign) => {
    if(sign > 0) {
        dispatch(updateFrontBgStyle({ opacity: 0 }))
        dispatch(updateTransitionProgress(0))
    } else if (sign < 0) {
        dispatch(updateFrontBgStyle({ opacity: 1 }))
        dispatch(updateTransitionProgress(100))
    }
}

/*
    Split background slid
    - param sign {number} positive for next slide and negative for previous slide
    - pages {object[]} array of pages
    - currentPage {number} index
 transition
**/
transitions.splitBackground.slideTransition = (sign, pages, currentPage, attachScrollEvent, detachScrollEvent) => {
    transitions.splitBackground.resetBackgroundStyles(sign)

    // Upgrade backgrounds
    transitions.splitBackground.updateBackgroundUrls(sign, pages, currentPage)

    // Detach scroll event
    detachScrollEvent()

    // Get target page
    const totalPages = pages.length

    // boundary condition
    const targetPage = sign > 0 ?
                        (currentPage + 1 > totalPages - 1 ? totalPages - 1 : currentPage + 1)
                        :
                        currentPage

    // boundary condition: don't animate backgrounds when going back on first page and going forward on last page
    if((sign < 0 && currentPage <= 0) || (sign > 0 && currentPage >= totalPages - 1))
        return attachScrollEvent()

    // Animation handle
    let transitionProgress = 0
    let transitionTimer = 0
    transitionTimer = window.setInterval(() => {
        const condition = sign > 0 ? currentPage > targetPage : currentPage < targetPage

        if(transitionProgress > 100) {
            ////// Stop animation

            // Attach scroll event to page change
            attachScrollEvent()

            // Clear interval
            window.clearInterval(transitionTimer)
            transitionTimer = undefined
        } else {
            ////// Continue scrolling

            // Call background controls
            if (sign > 0) {
                dispatch(updateFrontBgStyle({ opacity: transitionProgress / 100 * 2 }))
                dispatch(updateTransitionProgress(transitionProgress / 100 < 0.5 ? 0 :  (transitionProgress / 100 - 0.5) * 2))
            } else {
                dispatch(updateFrontBgStyle({ opacity: transitionProgress < 50 ? 1 : 1 - (transitionProgress / 100 - 0.5) * 2 }))
                dispatch(updateTransitionProgress(1 - transitionProgress / 100 < 0.5 ? 0 :  (1 - transitionProgress / 100 - 0.5) * 2))
            }

            // Increment transition progress
            transitionProgress = transitionProgress + 1
        }
    }, 5)
}



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
})



const PresentationDumb = props => {
    let currentPage = props.currentPage < 0 ? 0 : props.currentPage
    currentPage = currentPage > props.pages.length - 1 ? props.pages.length - 1 : currentPage

    const Comp = props.pages[currentPage].comp

    return (
        <Comp { ...props } />
    )
}

class Presentation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0,
        }

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

    componentWillUpdate() {
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

    goToNextPresentation() {
        this.detachScrollEvent()

        this.props.parentPresentationNextSlide()
    }

    goToPreviousPresentation() {
        this.detachScrollEvent()

        this.props.parentPresentationPresviousSlide()
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

        // User callback
        this.props.goToNextPage(currentPage)

        // Background transitions
        transitions.splitBackground.slideTransition(1, this.props.pages, currentPage, this.attachScrollEvent, this.detachScrollEvent)

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

        // User callback
        this.props.goToPreviousPage(currentPage)

        // Background transitions
        transitions.splitBackground.slideTransition(-1, this.props.pages, currentPage, this.attachScrollEvent, this.detachScrollEvent)

        // Update state
        this.setState({ currentPage: previousPage })
    }

    /*
       Attach wheel event to page change
    **/
    attachScrollEvent() {
        if(this.props.attachToMouseScroll)
            window.addEventListener("wheel", this.onScroll)
    }

    /*
       Detach wheel event from page change
    **/
    detachScrollEvent() {
        if(this.props.attachToMouseScroll)
            window.removeEventListener("wheel", this.onScroll)
    }

    /*
       Change slide on user scroll
    **/
    onScroll(e) {
        const sign = e.deltaY

        if(sign > 0)
            this.goToNextPage()
        else if(sign < 0)
            this.goToPreviousPage()
    }


    render() {

        return (
            <PresentationDumb
                { ...this.props }
                parentPresentationNextSlide={ this.goToNextPage }
                parentPresentationPreviousSlide={ this.goToPreviousPage }
                currentPage={ this.state.currentPage }
            />
        )
    }
}

Presentation.defaultProps = {
    goToNextPage: () => {},
    goToPreviousPage: () => {},
    parentPresentationNextSlide: () => console.log('next pres'),
    parentPresentationPreviousSlide: () => console.log('prev pres'),
    attachToMouseScroll: true,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)
