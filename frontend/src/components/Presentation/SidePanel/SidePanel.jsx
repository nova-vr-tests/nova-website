// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'
import { connect } from 'react-redux'

import { lifecycle, withState, compose } from 'recompose'

import getStyles, { getBgStyles } from './SidePanelStyles.jsx'

import {
    coord2Circ,
    scrollTo,
    togglePanel,
} from './helpers.jsx'

import type {
    BgProps,
    Props,
    ReduxDispatch,
    ReduxState,
    OwnProps,
} from './SidePanelTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../../storeTypes.jsx'

import type { HOC } from 'recompose'


const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        linePosition: state.appReducer.linePosition,
    }
}

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
    return {
    }
}


const BG: React.StatelessFunctionalComponent<BgProps> = props => {
    const widthCoef = props.widthCoef

    const styles = getBgStyles(props)

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

const SidePanel: React.StatelessFunctionalComponent<Props> = props => {
    const { isOpened } = props
    const widthCoef = props.width

    const styles = getStyles(props)

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.map((e, i) => ({ ...e, i })).filter(e => e.pid === pid)
    const paragraphsAboveLine = presSlides.filter(e => e.i < props.currentPage)
    const paragraphsRest = presSlides.filter(e => e.i >= props.currentPage)
    const contentAboveLine = paragraphsAboveLine.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)
    const contentRest = paragraphsRest.map((e, i) => <div key={ i } style={ e.i === props.currentPage ? styles.paragraph : {} }><e.comp key={ i } /></div>)

    return (
        <div style={ styles.wrapper } onClick={ () => props.setIsOpened(!isOpened) }>
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


const sidePanelLifecycle = {
    componentDidUpdate: function(prevProps: Props) {
        const targetScroll = document.getElementById('paragraphs-top').clientHeight
        const currentScroll = document.getElementById('side-panel-scroll').scrollTop

        if(this.props.currentPage !== prevProps.currentPage) {
            scrollTo('side-panel-scroll', currentScroll, targetScroll, 0)
        }

        if(this.props.isOpened !== prevProps.isOpened) {
            requestAnimationFrame(() => togglePanel(prevProps.isOpened ? 11 : 1, prevProps.isOpened ? 1 : 11, 0, this.props.setWidth))
        }
    },
}

const enhance: HOC<*, Props> = compose(
    withState('isOpened', 'setIsOpened', true),
    withState('width', 'setWidth', 11),
    lifecycle(sidePanelLifecycle),
)

const SidePanelSmart = enhance(SidePanel)

const ConnectedSidePanel: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanelSmart)

export default ConnectedSidePanel
