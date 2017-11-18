import * as React from 'react'

import { lifecycle, withState, compose } from 'recompose'

import getStyles from './SlideStyles.jsx'

import {
    scrollTo,
} from './helpers.jsx'

const Slide = props => {
    const styles = getStyles(props)

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)
    const paragraphsAboveLine = presSlides.filter(e => e.i < props.currentPage)
    const paragraphsRest = presSlides.filter(e => e.i >= props.currentPage)
    const contentAboveLine = paragraphsAboveLine.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)
    const contentRest = paragraphsRest.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)


    const { id } = props
    const id1 = id + '-paragraph'
    const id2 = id + '-scroll'

    const _h2 = props.pages[props.currentPage].h2
    const h2 = _h2 === 'Introduction' ? '' : _h2

    return [
        <h2 style={ styles.title } key={ 1 }>{ h2 }</h2>,
        <div style={ styles.slideParagraphs } id={ id2 } key={ 2 }>
        <div>
        <div style={ styles.head }>
        </div>
        <div id={ id1 }>
        { contentAboveLine }
                    </div>
                    <div>
                        { contentRest }
                    </div>
                    <div style={ styles.tail }>
                    </div>
                </div>
            </div>
    ]
}

const slideLifecycle = {
    componentDidUpdate: function(prevProps) {
        const { id } = this.props
        const id1 = id + '-paragraph'
        const id2 = id + '-scroll'

        const targetScroll = document.getElementById(id1).clientHeight
        let currentScroll = document.getElementById(id2).scrollTop


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
            }

            scrollTo(id2, currentScroll, targetScroll, 0, new Date().getTime())
        }
    },
}

const enhance = compose(
    lifecycle(slideLifecycle),
)

const SlideSmart = enhance(Slide)

export default SlideSmart
