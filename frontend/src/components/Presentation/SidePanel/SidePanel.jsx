// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'
import { connect } from 'react-redux'

import { lifecycle, withState, compose } from 'recompose'

import SlideTransition from '../SlideTransition/SlideTransition.jsx'

import getStyles, { getBgStyles } from './SidePanelStyles.jsx'

import arrow from '../../img/arrow.svg'

import Slide from '../Slide/Slide.jsx'

import {
    coord2Circ,
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

type ToggleButtonProps = {
    linePosition: number,
    onClick: void => void,
    isOpened: boolean,
}

const ToggleButton: React.StatelessFunctionalComponent<ToggleButtonProps> = props => {
    const { unitHeight, unitWidth } = appStyles

    const y = 'calc(' + (11 + 2 * props.linePosition) + ' * ' + unitHeight + ')'
    const styles = {
        wrapper: {
            position: 'absolute',
            right: '100%',
            top: y,
            transform: props.isOpened ? 'translateY(-50%)' : 'translateY(-50%)rotateY(180deg)',
            transition: 'transform ' + appStyles.sidePanel.transitionTime / 500 + 's linear',
        },
        img: {
            height: unitHeight,
            width: unitHeight,
            cursor: 'pointer',
            paddingRight: 'calc(0.5 * ' + unitWidth + ')',
        }
    }

    return (
        <div style={ styles.wrapper } onClick={ props.onClick }>
            <img src={ arrow } alt="toggle panel" style={ styles.img } />
        </div>
    )
}

const SidePanel: React.StatelessFunctionalComponent<Props> = props => {
    const { isOpened } = props
    const widthCoef = props.width

    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper }>
            <BG
                widthCoef={ widthCoef }
            />
            <div style={ styles.contentWrapper }>
                <ToggleButton
                    isOpened={ props.isOpened }
                    onClick={ () => props.setIsOpened(!isOpened) }
                    linePosition={ props.linePosition }
                />

                <SlideTransition
                    appTheme='default'
                    currentPage={ props.currentPage }
                    pages={ props.pages }
                    linePosition={ props.linePosition }
                />

            </div>
        </div>
    )
}


const sidePanelLifecycle = {
    componentDidUpdate: function(prevProps: Props) {
        if(this.props.isOpened !== prevProps.isOpened) {
            requestAnimationFrame(() => togglePanel(prevProps.isOpened ? 11 : 0, prevProps.isOpened ? 0 : 11, 0, this.props.setWidth, new Date().getTime()))
        }
    },
}

const enhance: HOC<*, Props> = compose(
    withState('isOpened', 'setIsOpened', true),
    withState('width', 'setWidth', 11),
    lifecycle(sidePanelLifecycle),
)

const SidePanelSmart: React.ComponentType<Props> = enhance(SidePanel)

const ConnectedSidePanel: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanelSmart)

export default ConnectedSidePanel
