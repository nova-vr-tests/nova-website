import * as React from 'react'
import {
    compose,
    lifecycle,
    withState,
} from 'recompose'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import getStyles, {
    getNextPageStyles,
} from './SlideStyles.jsx'

import { translateXLayersBgs } from '../../../reducer/actions/Bg.js'

import arrow from '../../img/arrow.svg'

const mapStateToProps = state => ({
    scrollProgress: state.bgReducer.progress,
    currentUrl: window.location.origin + '/' + state.routing.location.pathname,
    currentPage: state.appReducer.currentPage,
    goToPage: state.appReducer.goToPage,
})

const mapDispatchToProps = dispatch => ({
    applyParalax: progress => dispatch(translateXLayersBgs(progress)),
    goToNextPage: (currentPage=0, pages=[], pushUrl) => {

        const filteredUrls = pages.filter((e, i) => (e.pid !== pages[currentPage].pid && i > currentPage))

        if(filteredUrls.length > 0) {
            pushUrl(filteredUrls[0].path)
        }
    },
    pushUrl: url => dispatch(push(url)),
})

const calcSlideNumFromPageNum = (pages, currentPage, currentPid) => {
    return currentPage - pages
        .filter((e, i) => i < currentPage)
        .filter((e) => e.pid !== currentPid).length
}

/*
   - e => scrollEvent
   - elId => id of el to scroll
*/
let oldDate = new Date()
let currentScroll = 0
let progress = 0
let targetScroll = 0
let rafId = 0
let dY = 0
let el

const scroll = (e, elId, callback = () => {}) => {
    const newDate = new Date()
    if(!el)
        el = document.getElementById(elId)

    // update target scroll
    if(e.deltaY !== 0) {

        dY = 3 * Math.sign(e.deltaY)

        oldDate = new Date()

        if(progress !== 0) {
            currentScroll += (targetScroll - currentScroll) * progress
            currentScroll = el.scrollTop
            cancelAnimationFrame(rafId)
        } else {
        }

        progress = 0
        targetScroll = currentScroll + dY * 40
    }

    const deltaT = (newDate.getTime() - oldDate.getTime()) / 700
    progress = Math.sin(Math.PI * deltaT)
    progress = deltaT*(2-deltaT)

    el.scrollTop = currentScroll + (targetScroll - currentScroll) * progress

    if(progress < 0.99) {
        rafId = requestAnimationFrame(() => {
            const scrollProgress =
                (el.scrollTop / (el.scrollHeight - el.offsetHeight))

            if(el.scrollTop !== 0) {
                callback(scrollProgress)
            }

            scroll({ deltaY: 0 }, elId, callback)
        })
    } else {
        currentScroll = targetScroll
    }

}

const Slide = props => {
    const styles = getStyles(props)

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)

    const allParagraphs = presSlides.map((e, i) => (
        <div
            className={ i < calcSlideNumFromPageNum(props.pages, props.currentPage, props.pages[props.currentPage].pid) ? 'above' : '' }
            key={ i }
            style={ {
                    ...{ display: 'flex', border: '1px solid rgba(255, 0, 0, 0)' }
            } }
        >
            <e.comp key={ i } />
        </div>
    ))

    const { id } = props
    const id1 = id + '-paragraph'
    const id2 = id + '-scroll'

    if(props.transitionProgress <= 0 || props.transitionProgress >= 1) {
        if(props.scrollEvent && !props.isTarget) {
            scroll(props.scrollEvent, id2, props.applyParalax)
        }

    } else {
        window.requestAnimationFrame(() => {
            document.getElementById(id2).scrollTop = 0
            props.applyParalax(0)
        })
    }





    const NextPage = props => {
        const nextPageStyles = getNextPageStyles(props)

        return (
            <div
                onClick={ () => props.goToNextPage(props.currentPage + 1, props.pages, props.pushUrl) }
                style={ nextPageStyles.wrapper }>
                <img
                    src={ arrow }
                    alt="next-page"
                    style={ nextPageStyles.img }
                />
            </div>
        )
    }

    return [
        <div
            style={ {...styles.slideParagraphs, position: 'relative'} }
            id={ id2 }
            key={ 123 }>
            <div style={ styles.paragraphsWrapper }>
            <div
                id={ id1 }
                style={ styles.allParagraphs }>
                { props.CurrentPage }
                </div>
                <div
                    style={ styles.tail }
                    id='tail'>
                    <NextPage
                        pages={ props.pages }
                        goToNextPage={ props.goToNextPage }
                        currentPage={ props.currentPage }
                        pushUrl={ props.pushUrl }
                    />
                </div>
            </div>
        </div>
    )
}

const SmartComp = compose(
    withState(
        'CurrentPage',
        'setCurrentPage',
        <div></div>,
    ),
    lifecycle({
        componentDidMount() {
            console.log('mountgin from slide.jsx')

            const { pid } = this.props.pages[this.props.currentPage]
            const presSlides = this.props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)
            const PageComp = presSlides[0].comp
            this.props.setCurrentPage(<PageComp />)
        },
        componentWillUpdate(nextProps) {
            if(this.props.currentPage !== nextProps.currentPage) {
            const { pid } = nextProps.pages[nextProps.currentPage]
            const presSlides = nextProps.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)
            const PageComp = presSlides[0].comp
            this.props.setCurrentPage(<PageComp />)
                console.log(PageComp)
        }
        },
        componentWillUnmount() {
        }
    }),
)(Slide)

const ConnectedSlide = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedSlide



