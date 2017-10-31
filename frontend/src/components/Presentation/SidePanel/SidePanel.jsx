// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'
import { connect } from 'react-redux'

import { lifecycle, withState, compose } from 'recompose'

import type { Page } from '../PresentationTypes.jsx'


const mapStateToProps = function(state) {
    return {
        linePosition: state.appReducer.linePosition,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
    }
}

const coord2Circ = (x: number): {y1: number, y2: number} => {
    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const { radius, centerX, centerY } = appStyles.header

    // unit conversions
    const r = radius * vh
    const Cx = centerX * vw
    const Cy = centerY * vh

    // solve for x = sidebar width

    // solve for the determinant
    const delta1 = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const delta2 = Math.pow(2 * Cy, 2) + 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const y1 = ((2*Cy) + Math.sqrt(delta1)) / 2
    const y2 = ((2*Cy) + Math.sqrt(delta2)) / 2

    return { y1, y2 }
}

const BG = props => {
    const widthCoef = props.widthCoef
    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'

    const styles = {
        wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: panelWidth,
            right: 0,
        },
        svg: {
            width: panelWidth,
        },
    }

    const { header } = appStyles

    // unit conversions
    const vh = document.documentElement.clientHeight / 100
    const r = header.radius * vh

    const screenRightEdge = widthCoef * appStyles.unitWidthJs
    const { clientWidth, clientHeight } = document.documentElement
    const p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
    const p2 = {x: 0, y: coord2Circ(clientWidth - widthCoef * appStyles.unitWidthJs).y1}
    const p3 = {x: 0, y: clientHeight - p2.y}
    const p4 = {x: screenRightEdge, y: clientHeight - p1.y}
    const path =
        'M ' + p1.x + ' ' + p1.y
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p2.x + ' ' + p2.y
        + ' L ' + p3.x + ' ' + p3.y + ' '
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p4.x + ' ' + p4.y


    return (
        <div style={ styles.wrapper }>
            <svg height='100%' style={ styles.svg }
                 viewport='0 0 100 100'
                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d={ path }
                      fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 0, 0, 0)" strokeWidth="3" />
            </svg>
        </div>
    )
}

type Props = {
    isOpened: boolean,
    comp: React.Node,
    currentPage: number,
    pages: Array<Page>,
}

const SidePanel: React.StatelessFunctionalComponent<Props> = props => {
    const widthCoef = 11
    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'
    const headerHeightCoef = 3
    const footerHeightCoef = headerHeightCoef
    const lineHeightCoef = 4 // height of vertical line spanning across screen
    const lineYCoef = 9 + (2 * props.linePosition) // distance from top of screen to top of line
    const titleHeightCoef = 2
    const headHeightCoef = lineYCoef - headerHeightCoef - titleHeightCoef
    const tailHeightCoef = 24 - lineYCoef - footerHeightCoef - lineHeightCoef

    const styles = {
        wrapper: {
        },
        isOpened: {
        },
        contentWrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 'calc(100vw - ' + panelWidth + ')',
            padding: 'calc(' + headerHeightCoef + ' * ' + appStyles.unitHeight + ') ' + appStyles.unitWidth,
        },
        slideParagraphs: {
            height: 'calc(' + (24 - headerHeightCoef - titleHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY: 'hidden',
            overflowX: 'hidden',
        },
        head: {
            height: 'calc(' + headHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        tail: {
            height: 'calc(' + tailHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        title: {
            height: 'calc(2 * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            margin: 0,
        },
        paragraph: {
            height: 'calc(' + lineHeightCoef + ' * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
    }

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)
    const paragraphsAboveLine = presSlides.filter(e => e.i < props.currentPage)
    const paragraphsRest = presSlides.filter(e => e.i >= props.currentPage)
    const contentAboveLine = paragraphsAboveLine.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)
    const contentRest = paragraphsRest.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)

    return (
        <div style={ styles.wrapper }>
            <BG
                widthCoef={ widthCoef }
            />
            <div style={ styles.contentWrapper }>
                <h2 style={ styles.title }>{ props.pages[props.currentPage].h2 }</h2>
                <div style={ styles.slideParagraphs } id="side-panel-scroll">
                    <div>
                        <div style={ styles.head }>
                        </div>
                        <div id="paragraphs-top">
                            { contentAboveLine }
                        </div>
                        <div>
                            { contentRest }
                        </div>
                        <div style={ styles.tail }>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const scrollTo = (id, initScroll, targetScroll, progress, setScroll) => {
    const el = document.getElementById(id)

    const scrollDistance = targetScroll - initScroll
    const currentScroll = initScroll + scrollDistance * progress
    if(progress >= 1) {
        return
    } else {
        el.scrollTo(0, currentScroll)
        requestAnimationFrame(() => scrollTo(id, initScroll, targetScroll, progress + 0.05, setScroll))
    }

}

const sidePanelLifecycle = {
    componentDidMount: function() { this.setState({ scrollOffset: 0 }) },
    componentDidUpdate: function(prevProps) {
        const targetScroll = document.getElementById('paragraphs-top').clientHeight
        const currentScroll = document.getElementById('side-panel-scroll').scrollTop

        if(this.state.currentPage === prevProps.currentPage || this.state.scrollOffset !== 0) {
            return
        }

        scrollTo('side-panel-scroll', currentScroll, targetScroll, 0, this.props.setScrollOffset)

    },
}

const SidePanelSmart = compose(
    withState('scrollOffset', 'setScrollOffset', 0),
    lifecycle(sidePanelLifecycle),
)(SidePanel)

const ConnectedSidePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanelSmart)

export default ConnectedSidePanel
