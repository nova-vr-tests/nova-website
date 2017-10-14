import React from 'react'
import { connect }from 'react-redux'

import logo from '../img/nova-logo.svg'

import { styles as appStyles } from '../../constants.js'
import { updateSidebarIntersection } from '../../reducer/actions/Header.js'

import { push } from 'react-router-redux'

const mapStateToProps = function(state) {
	return {
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
      appTheme: state.appReducer.appTheme,
    }
}

const mapDispatchToProps = function(dispatch) {
	return {
      updateSidebarIntersection: sidebarInterserction => dispatch(updateSidebarIntersection(sidebarInterserction)),
      goTo: url => dispatch(push(url)),
  }
}

const styleConstants = {}
styleConstants.radius = 1340 // vh
styleConstants.diam = 'calc(' + styleConstants.radius + 'vh * 2)'
styleConstants.centerX = 50 // vw
styleConstants.centerY = -1329 // vh

const HeaderDumb = props => {
    const { radius, diam, centerX, centerY } = styleConstants

    const styles = {
        bgImage: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        circle: {
            transform: 'translateY(' + centerY + 'vh)translateX(' + centerX + 'vw)',
            backgroundColor: appStyles.themes[props.appTheme].headerBgColor,
            transition: 'background-color 0.5s linear',
            position: 'absolute',
            height: diam,
            width: diam,
            borderRadius: diam,
            top: 'calc(0vh - ' + radius + 'vh)',
            left: 'calc(0vh - ' + radius + 'vh)',
        },
        logo: {
            position: 'absolute',
            height: appStyles.unitHeight,
            width: appStyles.unitHeight,
            filter: 'invert(100%)',
            top: 'calc(' + appStyles.unitHeight + ' / 2)',
            left: 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ' / 2 - 2 * ' + appStyles.unitHeight + ' / 6)',
            zIndex: 1,
            transition: 'transform ' + appStyles.sidebar.hoverTransition.length + appStyles.sidebar.hoverTransition.type,
            cursor: 'pointer',
        },
        logoSidebarClosed: {
            transform: 'translateX(calc(-' + appStyles.unitHeight + ' / 2))',
        },
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
            <div
                className="header--wrapepr"
                style={ styles.circle }
            >
            </div>
        </div>
    )
}

class Header extends React.Component {
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

    render() {
        return <HeaderDumb { ...this.props } />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export {
    styleConstants,
}
