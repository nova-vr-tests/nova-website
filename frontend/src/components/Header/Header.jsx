// @flow

import * as React from 'react'
import { connect }from 'react-redux'

import logo from '../img/nova-logo.svg'

import { styles as appStyles } from '../../constants.js'
import { updateSidebarIntersection } from '../../reducer/actions/Header.js'

import { push } from 'react-router-redux'

import getStyles from './HeaderStyles.jsx'

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
      appTheme: state.appReducer.appTheme,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
	return {
      updateSidebarIntersection: sidebarInterserction => dispatch(updateSidebarIntersection(sidebarInterserction)),
      goTo: url => dispatch(push(url)),
  }
}

const styleConstants = appStyles.header

const HeaderDumb: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

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
            <div
                className="header--wrapepr"
                style={ styles.circle }
            >
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
}
