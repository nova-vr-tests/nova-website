// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'
import { connect } from 'react-redux'

import { lifecycle, withState, compose } from 'recompose'

import getStyles, { getBgStyles } from './SidePanelStyles.jsx'

import arrow from '../../img/arrow.svg'

import { updateIsSidePanelOpened } from '../../../reducer/actions/App.js'

import {
    coord2CircDefault,
    coord2CircInverted,
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


const sidePanelTypes = {
    DEFAULT: 1,
    INVERTED: 2,
}

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        linePosition: state.appReducer.linePosition,
        isFooterOpened: state.appReducer.isFooterOpened,
        appTheme: state.appReducer.appTheme,
        windowWidth: state.appReducer.windowWidth,
        windowHeight: state.appReducer.windowHeight,
    }
}

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
    return {
        updateIsSidePanelOpened: isOpened => dispatch(updateIsSidePanelOpened(isOpened)),
    }
}


const BG: React.StatelessFunctionalComponent<BgProps> = props => {
    const { clientWidth, clientHeight } = document.documentElement
    const widthCoef = clientWidth < appStyles.mediaQueries.phone ? clientWidth / appStyles.unitWidthJs : props.widthCoef

    const styles = getBgStyles(props)

    const { header } = appStyles

    // unit conversions
    const vh = document.documentElement.clientHeight / 100
    const r = header.radius * vh

    let coord2Circ = props.type === sidePanelTypes.DEFAULT ? coord2CircDefault : coord2CircInverted

    const screenRightEdge = widthCoef * appStyles.unitWidthJs
    let p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
    let p2 = {x: 0, y: coord2Circ(clientWidth - widthCoef * appStyles.unitWidthJs).y1}
    let p3 = {x: 0, y: appStyles.unitHeightJs * 9}
    let p4 = {x: screenRightEdge, y: appStyles.unitHeightJs * 9}

    let path =
        'M ' + p1.x + ' ' + p1.y
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p2.x + ' ' + p2.y
        + ' L ' + p3.x + ' ' + p3.y + ' '
        + ' L ' + p4.x + ' ' + p4.y + ' '
    let color = 'rgba(0, 0, 0, 0.6)'

    if(props.type === sidePanelTypes.INVERTED) {
        p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
        p2 = {x: 0, y: coord2Circ(clientWidth - widthCoef * appStyles.unitWidthJs).y1}
        p3 = {x: 0, y: clientHeight - p2.y}
        p4 = {x: screenRightEdge, y: clientHeight - p1.y}
        path =
            'M ' + p1.x + ' ' + p1.y
            + ' A ' + r + ' ' + r + ' 0 0 0 ' + p2.x + ' ' + p2.y
            + ' L ' + p3.x + ' ' + p4.y + ' '
            + ' L ' + p1.x + ' ' + p4.y + ' '

        color = 'rgba(0, 0, 0, 0.1)'
    }



    return (
        <div style={ styles.wrapper }>
            <svg height='100%' style={ styles.svg }
                 viewport='0 0 100 100'
                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d={ path }
                      fill={ color } stroke="rgba(0, 0, 0, 0)" strokeWidth="3" />
            </svg>
        </div>
    )
}

type ToggleButtonProps = {
    linePosition: number,
    onClick: void => void,
    isOpened: boolean,
    type: number,
}

const getToggleButtonStyles = props => {
    const { unitHeight, unitWidth, mediaQueries } = appStyles

    const y = 'calc(' + (11 + 2 * props.linePosition) + ' * ' + unitHeight + ')'

    let display = 'inherit'
    if(document.documentElement.clientWidth < mediaQueries.phone) {
        display = 'none'
    }

    return {
        wrapper: {
            position: 'absolute',
            right: '100%',
            top: y,
            transition: 'transform ' + appStyles.sidePanel.transitionTime / 500 + 's linear',
            transform: props.isOpened ? 'translateY(-50%)' : 'translateY(-50%)rotateY(180deg)',
            display,
        },
        img: {
            height: unitHeight,
            width: unitHeight,
            cursor: 'pointer',
            paddingRight: 'calc(0.5 * ' + unitWidth + ')',
            filter: props.type === sidePanelTypes.DEFAULT ? 'inherit' : 'invert(10%)',
        }
    }
}

const ToggleButton: React.StatelessFunctionalComponent<ToggleButtonProps> = props => {
    const styles = getToggleButtonStyles(props)

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


    console.log('a', props.windowHeight)
    return (
        <div style={ styles.wrapper }>
            <BG
                widthCoef={ widthCoef }
                isFooterOpened={ props.isFooterOpened }
                type={ props.type }
                windowHeight={ props.windowHeight }
            />
            <div style={ styles.contentWrapper }>
                <ToggleButton
                    isOpened={ props.isOpened }
                   onClick={ () => props.setIsOpened(!isOpened) }
                    linePosition={ props.linePosition }
                    type={ props.type }
                />

                { props.children }
            </div>
        </div>
    )
}


const sidePanelLifecycle = {
    componentDidUpdate: function(prevProps: Props) {
        if(this.props.isOpened !== prevProps.isOpened) {
            requestAnimationFrame(() => togglePanel(prevProps.isOpened ? 11 : 0, prevProps.isOpened ? 0 : 11, 0, this.props.setWidth, new Date().getTime()))

            this.props.updateIsSidePanelOpened(this.props.isOpened)
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

export {
    sidePanelTypes,
}
