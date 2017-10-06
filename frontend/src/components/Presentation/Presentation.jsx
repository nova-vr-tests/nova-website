import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    updateFrontBgUrl,
    updateFrontBgStyle,
    updateBackBgUrl,
    updateBackBgStyle,
    updateBackLayers,
    updateTransitionProgress,
} from '../../reducer/actions/Bg.js'

import {
    updateLinePosition,
    updateAppTheme,
    updateCurrentPage,
    updateGoToPage,
} from '../../reducer/actions/App.js'

import transitions from './transitions.js'

import SlideTransition from './SlideTransition.jsx'

const mapStateToProps = state => ({
    routing: state.routing,
    appTheme: state.appReducer.appTheme,
    currentPage: state.appReducer.currentPage,
    windowWidth: state.appReducer.windowWidth,
})

const mapDispatchToProps = dispatch => ({
    updateFrontBgUrl: url => dispatch(updateFrontBgUrl(url)),
    updateBackBgUrl: url => dispatch(updateBackBgUrl(url)),
    updateFrontBgStyle: style => dispatch(updateFrontBgStyle(style)),
    updateBackBgStyle: style => dispatch(updateBackBgStyle(style)),
    updateTransitionProgress: p => dispatch(updateTransitionProgress(p)),
    updateBackLayers: l => dispatch(updateBackLayers(l)),
    goTo: url => dispatch(push(url)),
    updateLinePosition: position => dispatch(updateLinePosition(position)),
    updateAppTheme: appTheme => dispatch(updateAppTheme(appTheme)),
    updateCurrentPage: currentPage => dispatch(updateCurrentPage(currentPage)),
    updateGoToPage: goToPage => dispatch(updateGoToPage(goToPage)),
})


const PresentationDumb = props => {
    return (
        <SlideTransition { ...props } />
    )
}

class Presentation extends React.Component {
    constructor(props) {
        super(props)

        const currentPage = this.pathnameToSlideNumber(this.props.routing.location.pathname)
        this.props.updateCurrentPage(currentPage)

        this.props.updateBackLayers(this.props.pages[currentPage].layers)

        this.updateAppTheme(currentPage)


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
        this.updateSlideFromUrl = this.updateSlideFromUrl.bind(this)
        this.getTransitionType, this.getTransitionType.bind(this)

        this.props.updateGoToPage(this.goToPage)
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
        // update app theme on current page state update
        this.updateAppTheme(nextProps.currentPage)
    }

    updateAppTheme(currentPage) {
        this.props.updateAppTheme(this.props.pages[currentPage].theme)
    }

    pathnameToSlideNumber(pathname) {
        if(pathname === '/') {
            return 0
        }

        return this.props.pages.map((e, i) => pathname === e.path ? i : -1).filter(e => e >= 0)[0]
    }

    componentWillReceiveProps(nextProps) {
        const nextPathname = nextProps.routing.location.pathname
        this.updateSlideFromUrl(nextPathname)
    }

    updateSlideFromUrl(nextPathname) {
        const currentPathname = this.props.routing.location.pathname

        if(currentPathname !== nextPathname) {
            console.log(currentPathname, nextPathname)
            let nextSlide = this.pathnameToSlideNumber(nextPathname)

            this.goToPage(nextSlide)
        }
    }

    getTransitionType(currentPage, targetPage) {
        if(this.props.pages[currentPage].pid === this.props.pages[targetPage].pid) {
            return transitions.types.BG_PARALAX
        } else {
            return transitions.types.BG_SPLIT
        }
    }

    goToPage(targetPage) {
        const { pages, currentPage } = this.props

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

            const transitionType = this.getTransitionType(currentPage, targetPage)

            transitions.startTransition(transitionType, transitionParams)

            this.props.updateCurrentPage(targetPage)
        }
    }

    /*
       Returns true if currentPage is first page in pages array
    **/
    isFirstPage() {
        return this.props.currentPage === 0 ? true : false
    }

    /*
       Returns true if currentPage is last page in pages array
    **/
    isLastPage() {
        return this.props.currentPage === this.props.pages.length - 1 ? true : false
    }

    /*
       Goes to next slide
    **/
    goToNextPage() {
        return this.goToPage(this.props.currentPage + 1)
    }

    /*
       Goes to previous slide
    **/
    goToPreviousPage() {
        return this.goToPage(this.props.currentPage - 1)
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


        if(sign > 0) {
            this.goToNextPage()
        } else if(sign < 0) {
            this.goToPreviousPage()
        }
    }


    render() {

        return (
            <PresentationDumb
                { ...this.props }
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
