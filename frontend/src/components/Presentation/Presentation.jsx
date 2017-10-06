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

import {
    H1,
    H2,
} from '../pages/UI.jsx'

import { styles as appStyles } from '../../constants.js'

const mapStateToProps = state => ({
    routing: state.routing,
    appTheme: state.appReducer.appTheme,
    currentPage: state.appReducer.currentPage,
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

    translateTitle(currentTitle, currentAlign, targetTitle, targetAlign, sign) {
        if(sign >= 0) {
            if(currentTitle !== targetTitle || currentAlign !== targetAlign) {
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
            if(currentTitle !== targetTitle || currentAlign !== targetAlign) {
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
        const currentPage = this.props.pages[this.state.currentPage]
        const targetPage = this.props.pages[this.state.targetPage]

        const currentSlideStyle = {
            ...this.getTranslationStyles().currentSlide,
            height: appStyles.lineDimensions.height,
            right: currentPage.align === 'right' ? 0 : 'inherit',
        }

        const targetSlideStyle = {
            ...this.getTranslationStyles().targetSlide,
            height: appStyles.lineDimensions.height,
            right: targetPage.align === 'right' ? 0 : 'inherit',
        }

        const CurrentSlide = currentPage.comp
        const TargetSlide = targetPage.comp

        const currentH1 = currentPage.h1
        const currentH2 = currentPage.h2
        const targetH1 = targetPage.h1
        const targetH2 = targetPage.h2

        const sign = this.state.targetPage - this.state.currentPage
        let translates = {
            H1: this.translateTitle(currentH1, currentPage.align, targetH1, targetPage.align, sign),
            H2: this.translateTitle(currentH2, currentPage.align, targetH2, targetPage.align, sign),
        }

        const theme = appStyles.themes[this.props.appTheme]
        const fontColorTransition = 'color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc

        return (
            <div className='slide-transition--wrapper' style={{ color: theme.fontColor, position: 'relative', width: '100%' }}>
                <div className='current-slide--wrapper' style={ currentSlideStyle }>
                    <H1 style={ { ...translates.H1, ...{ color: theme.titleColor, transition: fontColorTransition } } }>{ currentH1 }</H1>
                    <H2 style={ { ...translates.H2, ...{ color: theme.titleColor, transition: fontColorTransition } } }>{ currentH2 }</H2>
                    <CurrentSlide { ...this.props } />
                </div>
                <div className='target-slide--wrapper' style={ targetSlideStyle }>
                    <H1 style={ { ...translates.H1, ...{ color: theme.titleColor, fontColorTransition } } }>{ targetH1 }</H1>
                    <H2 style={ { ...translates.H2, ...{ color: theme.titleColor, fontColorTransition } } }>{ targetH2 }</H2>
                    <H1 style={ translates.H1 }>{ targetH1 }</H1>
                    <H2 style={ translates.H2 }>{ targetH2 }</H2>
                    <TargetSlide { ...this.props } />
                </div>
            </div>
        )
    }
}



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
