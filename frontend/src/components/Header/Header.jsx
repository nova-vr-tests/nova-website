// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import logo from '../img/nova-logo.svg'

import { styles as appStyles } from '../../constants.js'
import { updateSidebarIntersection } from '../../reducer/actions/Header.js'

import { push } from 'react-router-redux'

import getStyles from './HeaderStyles.jsx'

import {
    coord2CircDefault,
} from '../Presentation/SidePanel/helpers.jsx'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
} from './HeaderTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
	return {
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
      isFooterOpened: state.appReducer.isFooterOpened,
      appTheme: state.appReducer.appTheme,
      windowWidth: state.appReducer.windowWidth,
      windowHeight: state.appReducer.windowHeight,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
	return {
      updateSidebarIntersection: sidebarInterserction => dispatch(updateSidebarIntersection(sidebarInterserction)),
      goTo: url => dispatch(push(url)),
  }
}

const styleConstants = appStyles.header

const Svg = props => {
    const { clientWidth } = document.documentElement
    const { header } = appStyles

    // unit conversions
    const vh = document.documentElement.clientHeight / 100
    const r = header.radius * vh

    let coord2Circ = coord2CircDefault

    const screenRightEdge = clientWidth
    let p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
    let p2 = {x: 0, y: coord2Circ(clientWidth).y1}
    let p3 = {x: 0, y: appStyles.unitHeightJs * 0}
    let p4 = {x: screenRightEdge, y: appStyles.unitHeightJs * 0}

    let path =
        'M ' + p1.x + ' ' + p1.y
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p2.x + ' ' + p2.y
        + ' L ' + p3.x + ' ' + p3.y + ' '
        + ' L ' + p4.x + ' ' + p4.y + ' '
    const { color } = props


    return (
        <svg
            height={ 3 * appStyles.unitHeightJs + 'px'}
            width={ document.documentElement.clientWidth + 'px'}
            style={ {} }
            viewport='0 0 100 100'
            xmlns="http://www.w3.org/2000/svg" version="1.1">
            <path
                d={ path }
                fill={ color }
                stroke="rgba(0, 0, 0, 0)"
                strokeWidth="3" />
        </svg>
    )
}

Svg.defaultProps = {
    color: 'rgba(0, 0, 0, 0.3)',
}

const HeaderDumb: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    let isSvgVisible = true
    if(props.isFooterOpened) {
        isSvgVisible = false
    }

    return (
        <div style={ styles.wrapper }>
            <img
                src={ logo }
                alt="logo"
                onClick={ () => props.goTo('/') }
                style={{
                    ...styles.logo,
                    ...(props.isSidebarOpened ? {} : styles.logoSidebarClosed),
                }}
            />

            <div style={{ opacity: isSvgVisible ? 1 : 0, transition: 'opacity 0.5s linear' }}>
                <Svg
                    isVisible={ isSvgVisible }
                    windowWidth={ props.windowWidth }
                    windowHeight={ props.windowHeight }
                />
            </div>
        </div>
    )
}

class Header extends React.Component<Props> {
    updateSidebarIntersection: (_: void) => void

    constructor(props) {
        super(props)

        this.updateSidebarIntersection = this.updateSidebarIntersection.bind(this)
    }

    componentDidMount() {
        this.updateSidebarIntersection()

        window.addEventListener("resize", this.updateSidebarIntersection)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSidebarIntersection)
    }

    updateSidebarIntersection() {
        const vh = document.documentElement.clientHeight / 100
        const vw = document.documentElement.clientWidth / 100
        const { radius, centerX, centerY } = styleConstants
        const { unitWidthJs } = appStyles

        // unite conversions
        const unitWidth = unitWidthJs
        const r = radius * vh
        const Cx = centerX * vw
        const Cy = centerY * vh

        // solve for x = sidebar width
        const x =  3 * unitWidth

        // solve for the determinant
        const delta = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
        const borderOffset = ((2*Cy) + Math.sqrt(delta)) / 2

        this.props.updateSidebarIntersection(borderOffset)
    }

    render(): React.Element<typeof HeaderDumb> {
        return <HeaderDumb { ...this.props } />
    }
}

const ConnectedHeader: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default ConnectedHeader

export {
    styleConstants,
    Svg
}
