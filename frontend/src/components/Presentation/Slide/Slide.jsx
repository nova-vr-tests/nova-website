import * as React from 'react'

import { lifecycle, withState, compose } from 'recompose'

import getStyles from './SlideStyles.jsx'

import {
    getParagraphsSize,
    scrollTo,
} from './helpers.jsx'

const calcSlideNumFromPageNum = (pages, currentPage, currentPid) => {
    return currentPage - pages
        .filter((e, i) => i < currentPage)
        .filter((e) => e.pid !== currentPid).length
}

const Slide = props => {
    const styles = getStyles(props)

    const { pHeights } = props

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)

    const foo = calcSlideNumFromPageNum(props.pages, props.currentPage, props.pages[props.currentPage].pid)
    const bar = foo === 0 ? 0.1667 * document.documentElement.clientHeight : pHeights[0]
    const allParagraphs = presSlides.map((e, i) => (
        <div
            className={ i < calcSlideNumFromPageNum(props.pages, props.currentPage, props.pages[props.currentPage].pid) ? 'above' : '' }
            key={ i }
            style={ {
                    ...{ height: (i === 0 ? bar : pHeights[i] + 'px') },
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





const interpolateArrays = (arr1, arr2, t) => arr1.map((e, i) => e + (arr2[i] - e) * t)


const calcPHeights = (defaultPHeight, currentPage, targetPage, pages, progress) => {
    const currentSlide = pages[currentPage]
    const targetSlide = pages[targetPage]

    // Return if switching presentation (don't animate pHeight values)
    if(currentSlide.pid !== targetSlide.pid) {
        // return
    }

    const currentSlideNumber = calcSlideNumFromPageNum(pages, currentPage, currentSlide.pid)
    const targetSlideNumber = calcSlideNumFromPageNum(pages, targetPage, targetSlide.pid)

    // calculate current pHeights
    const currentPHeights = [...defaultPHeight]
    // calculate target pHeights
    const targetPHeights = [...defaultPHeight]

    currentPHeights[currentSlideNumber] = 0.1667 * document.documentElement.clientHeight //* (1 - progress)
    targetPHeights[targetSlideNumber] = 0.1667 * document.documentElement.clientHeight //* progress

    const interpolatedData = interpolateArrays(currentPHeights, targetPHeights, progress)

    return interpolatedData
}

const slideLifecycle = {
    componentDidMount: function() {
        const defaultPHeights = getParagraphsSize('dummy')
        this.props.setDefaultPHeights(defaultPHeights)

        const pHeights = [...defaultPHeights]
        pHeights[0] = 0.1667 * document.documentElement.clientHeight
        this.props.setPHeights(pHeights)
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.props.currentPage < nextProps.currentPage) {
            const newHeights = [...this.props.defaultPHeights]
            newHeights[newHeights.length - 1] = 0.1667 * document.documentElement.clientHeight
            this.props.setPHeights(newHeights)
        }

    },
    componentDidUpdate: function(prevProps) {
        const { id } = this.props
        const id1 = id + '-paragraph'
        const id2 = id + '-scroll'

        let targetScroll = document.getElementById(id1).clientHeight
        let currentScroll = document.getElementById(id2).scrollTop

        document.getElementById('dummy').style.display = 'block'
        targetScroll = Array.from(
            document.getElementById('dummy')
                    .getElementsByClassName('above')
        ).map(e => e.clientHeight).reduce((acc, e) => acc + e, 0)
        document.getElementById('dummy').style.display = 'none'



        let progress = 0

        if(this.props.currentPage !== prevProps.currentPage) {

            if(
                this.props.pages[this.props.currentPage].pid !== prevProps.pages[prevProps.currentPage].pid
            ) {
                if(
                    this.props.currentPage < prevProps.currentPage
                    &&
                    Math.abs(this.props.currentPage - prevProps.currentPage) === 1
                ) {
                    currentScroll = 1000 // scroll to bottom of slide if going to previous slide or when coming from link
                } else {
                    currentScroll = 0 // scroll to top of slide if going to next slide
                }

                console.log(document.getElementById(id2).scrollTop)

                progress = 1
            }

            //////
            const defaultPHeights = getParagraphsSize('dummy')
            this.props.setDefaultPHeights(defaultPHeights)

            // this.props.setPHeights(calcPHeights(defaultPHeights, prevProps.currentPage, this.props.currentPage, this.props.pages, 1))
            const newPHeights = calcPHeights(defaultPHeights, prevProps.currentPage, this.props.currentPage, this.props.pages, 1)

            const getNewPHeights = progress => calcPHeights(defaultPHeights, prevProps.currentPage, this.props.currentPage, this.props.pages, progress)

            const time0 = new Date().getTime()
            const transition = (progress, t) => {
                if(progress >= 1) {
                    const newPHeights = getNewPHeights(progress)
                    this.props.setPHeights(newPHeights)

                    return 0
                } else {
                    if(newPHeights) {
                        const newPHeights = getNewPHeights(progress)
                        this.props.setPHeights(newPHeights)
                    }

                    const newProgress = (new Date().getTime() - time0) / t
                    requestAnimationFrame(() => transition(newProgress, t))
                }
            }



            transition(progress, 300)

            if(!this.props.isTarget)
                scrollTo(id2, currentScroll, targetScroll, 0, new Date().getTime())

            if(this.props.currentPage > prevProps.currentPage)
                document.getElementById(id2).scrollTo(0, 0)
            else
                document.getElementById(id2).scrollTo(0, 1000)
        }

    },
}

const enhance = compose(
    withState('pHeights', 'setPHeights', []),
    withState('defaultPHeights', 'setDefaultPHeights', []),
    lifecycle(slideLifecycle),
)

const SlideSmart = enhance(Slide)

export default SlideSmart
