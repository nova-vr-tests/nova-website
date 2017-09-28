import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateTransitionProgress
} from '../../reducer/actions/Bg.js'

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
})



const PresentationDumb = props => {
    let currentPage = props.currentPage < 0 ? 0 : props.currentPage
    currentPage = currentPage > props.pages.length - 1 ? props.pages.length - 1 : currentPage

    const Comp = props.pages[currentPage].comp

    return (
        <Comp { ...props } parentCurrentPage={ currentPage } />
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

        // Background transitions
        transitions.splitBackground.slideTransition(-1, this.props.pages, currentPage, this.attachScrollEvent, this.detachScrollEvent)

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
                parentPresentationNextSlide={ this.goToNextPage }
                parentPresentationPreviousSlide={ this.goToPreviousPage }
                currentPage={ this.state.currentPage }
                parentTotalPages={ this.props.pages.length }
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
