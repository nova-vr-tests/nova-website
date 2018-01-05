// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    updateBackLayers,
    updateTransitionProgress,
} from '../../reducer/actions/Bg.js'

import {
    updateLinePosition,
    updateAppTheme,
    updateCurrentPage,
    updateGoToPage,
    updatePages,
} from '../../reducer/actions/App.js'

import transitions from './transitions.js'

import SidePanel, { sidePanelTypes } from './SidePanel/SidePanel.jsx'
import TOC from './TOC/TOC.jsx'

import getStyles from './PresentationStyles.jsx'

import SlideTransition from './SlideTransition/SlideTransition.jsx'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
} from './PresentationTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'

import type {
    TransitionTypes,
} from './transitionTypes.jsx'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        routing: state.routing,
        appTheme: state.appReducer.appTheme,
        currentPage: state.appReducer.currentPage,
        windowWidth: state.appReducer.windowWidth,
        isFooterOpened: state.appReducer.isFooterOpened,
        goToPage: state.appReducer.goToPage,
        linePosition: state.appReducer.linePosition,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
    return {
        updateTransitionProgress: p => dispatch(updateTransitionProgress(p)),
        updateBackLayers: (l, pid) => dispatch(updateBackLayers(l, pid)),
        goTo: url => dispatch(push(url)),
        updateLinePosition: position => dispatch(updateLinePosition(position)),
        updateAppTheme: appTheme => dispatch(updateAppTheme(appTheme)),
        updateCurrentPage: currentPage => dispatch(updateCurrentPage(currentPage)),
        updateGoToPage: goToPage => dispatch(updateGoToPage(goToPage)),
        updatePages: pages => dispatch(updatePages(pages)),
    }
}





/**
   - Combines slides of same presentation into paragraph for side panel
   - Shows table of content and highlights current link
*/
const PresentationDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper }>
            <div style={ styles.toc }>
                <TOC
                    pages={ props.pages }
                    currentPage={ props.currentPage }
                    goTo={ props.goTo }
                    currentPath={ props.routing.location.pathname }
                    appTheme={ props.appTheme}
                />
            </div>
            <div style={ styles.sidePanel }>
                <SidePanel type={ sidePanelTypes.DEFAULT }>
                    <SlideTransition
                        resetScrollEvent={ props.resetScrollEvent }
                        appTheme={ props.appTheme }
                        currentPage={ props.currentPage }
                        pages={ props.pages }
                        linePosition={ props.linePosition }
                        scrollEvent={ props.scrollEvent }
                    />
                </SidePanel>
            </div>
        </div>
    )
}

/**
   - Updates line position on slide change
   - Scroll activated slide change
   - URL updates on mount and slide change
   - Presentation pages
   - Position in the presentation (page number)
   - Slide change only happens on click
*/
class Presentation extends React.Component<Props> {
    static defaultProps = {
        attachToMouseScroll: true,
    }

    eventCounter: number
    onScroll: (e: {deltaY: number}) => void
    goToNextPage: () => void
    goToPreviousPage: () => void
    attachScrollEvent: () => void
    detachScrollEvent: () => void
    isLastPage: () => void
    isFirstPage: () => void
    pathnameToSlideNumber: (pathname: string) => number
    goToPage: (page: number) => void
    updateSlideFromUrl: (nextPathname: string) => void
    getTransitionType: (currentPage: number, targetPage: number) => TransitionTypes
    updateLinePosition: (props?: Props) => void

    constructor(props: Props) {
        super(props)

        const currentPage = this.pathnameToSlideNumber(this.props.routing.location.pathname)
        this.props.updateCurrentPage(currentPage)

        this.props.updateBackLayers(
            this.props.pages[currentPage].layers,
            this.props.pages[currentPage].pid
        )

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
        this.getTransitionType = this.getTransitionType.bind(this)
        this.updateLinePosition = this.updateLinePosition.bind(this)
        this.resetScrollEvent = this.resetScrollEvent.bind(this)

        // Update redux goToPage function
        this.props.updateGoToPage(this.goToPage)

        this.state = {
            scrollEvent: null,
        }
    }

    componentDidMount() {
        // update pages in redux state for BG to have access to
        this.props.updatePages(this.props.pages)
        // Attach scroll to page change
        this.attachScrollEvent()

        // Deal with urls

        this.updateLinePosition()
    }

    componentWillUnmount() {
        this.detachScrollEvent()
    }

    componentWillUpdate(nextProps) {
        // Let footer update app theme when openeing but handle it from here when it closes
        if(!nextProps.isFooterOpened) {
            // update app theme on current page state update
            this.updateAppTheme(nextProps.currentPage)
        }
    }

    componentDidUpdate() {
        if(this.state.scrollEvent)
            this.resetScrollEvent()
    }

    resetScrollEvent() {
        this.setState({ scrollEvent: null })
    }

    updateAppTheme(currentPage) {
        this.props.updateAppTheme(this.props.pages[currentPage].theme)
    }

    pathnameToSlideNumber(pathname: string) {
        if(pathname === '/') {
            return 0
        }

        return this.props.pages.map((e, i) => pathname === e.path ? i : -1).filter(e => e >= 0)[0]
    }

    componentWillReceiveProps(nextProps) {
        const nextPathname = nextProps.routing.location.pathname
        this.updateSlideFromUrl(nextPathname)

        this.updateLinePosition(nextProps)
    }

    updateSlideFromUrl(nextPathname: string) {
        const currentPathname = this.props.routing.location.pathname

        if(currentPathname !== nextPathname) {
            let nextSlide = this.pathnameToSlideNumber(nextPathname)

            this.goToPage(nextSlide)
        }
    }

    /**
       Returns bg transition function between 2 slides
    */
    getTransitionType(currentPage: number, targetPage: number) {
        if(this.props.pages[currentPage].pid === this.props.pages[targetPage].pid) {
            return transitions.types.BG_PARALAX
        } else {
            return transitions.types.BG_SPLIT
        }
    }

    updateLinePosition(props: Props = this.props) {
        this.props.updateLinePosition(props.pages[props.currentPage].linePosition)
    }

    goToPage(targetPage: number) {
        const { pages, currentPage } = this.props

        this.updateLinePosition(this.props)

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
        e.preventDefault()
        this.setState({ scrollEvent: e })
    }


    render() {

        return (
            <PresentationDumb
                scrollEvent={ this.state.scrollEvent }
                resetScrollEvent={ this.resetScrollEvent }
                { ...this.props }
            />
        )
    }
}


const ConnectedPresentation: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Presentation)

export default ConnectedPresentation
