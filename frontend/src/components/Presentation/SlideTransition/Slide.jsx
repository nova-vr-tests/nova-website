import * as React from 'react'

import getStyles from '../Slide/SlideStyles.jsx'

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

const scroll = (e, elId) => {
    const newDate = new Date()
    if(!el)
        el = document.getElementById(elId)

    // update target scroll
    if(e.deltaY !== 0) {

        dY = e.deltaY

        oldDate = new Date()

        if(progress !== 0) {
            currentScroll += (targetScroll - currentScroll) * progress
            currentScroll = el.scrollTop
            cancelAnimationFrame(rafId)
        } else {
        }

        progress = 0
        targetScroll = currentScroll + dY * 50
    }

    const deltaT = (newDate.getTime() - oldDate.getTime()) / 1000
    progress = Math.sin(Math.PI * deltaT)

    const sign = Math.sign(dY)
    el.scrollTo(0, currentScroll + (targetScroll - currentScroll) * progress)


    if(progress < 0.99) {
        rafId = requestAnimationFrame(() => scroll({ deltaY: 0 }, elId))
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

    const defaultParagraphs = presSlides.map((e, i) => (
        <div
            className={ i < calcSlideNumFromPageNum(props.pages, props.currentPage, props.pages[props.currentPage].pid) ? 'above' : '' }
            key={ i }
            style={ {
                ...{ display: 'flex', color: 'rgba(0, 0, 0, 0)' }
            } }
        >
            <e.comp key={ i } />
        </div>
    ))


    const { id } = props
    const id1 = id + '-paragraph'
    const id2 = id + '-scroll'

    const _h2 = props.pages[props.currentPage].h2
    const h2 = _h2 === 'Introduction' ? '' : _h2

    if(props.scrollEvent) {
        scroll(props.scrollEvent, id2)
    }


    return [
        <div style={ {...styles.slideParagraphs, position: 'relative'} } id={ id2 } key={ 2 }>
            <div style={ {position: 'absolute', top: 0 } }>
                <div style={ styles.head }>
                </div>
                <div id={ id1 }>
                    <h2 className="above" style={ styles.title } key={ 1 }>{ h2 }</h2>
                    { allParagraphs }
                </div>
                <div style={ styles.tail } id='tail'>
                    <div id='dummy' style={ styles.dummy }>
                        { defaultParagraphs }
                    </div>
                </div>
            </div>
        </div>
    ]
}

export default Slide
