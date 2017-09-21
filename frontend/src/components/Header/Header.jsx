import React from 'react'
import { connect }from 'react-redux'

import logo from '../img/intro-logo/frame1.svg'
import Bg from '../Bg/Bg.jsx'

import { styles as appStyles } from '../../constants.js'
import { updateSidebarIntersection } from '../../reducer/actions/Header.js'

const mapStateToProps = function(state) {
	return {
    }
}

const mapDispatchToProps = function(dispatch) {
	return {
      updateSidebarIntersection: sidebarInterserction => dispatch(updateSidebarIntersection(sidebarInterserction)),
  }
}

const styleConstants = {}
styleConstants.radius = 1340, // vh
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            height: diam,
            width: diam,
            borderRadius: diam,
            top: 'calc(0vh - ' + radius + 'vh)',
            left: 'calc(0vh - ' + radius + 'vh)',
        },
        logo: {
            position: 'absolute',
            height: '13rem',
            width: '13rem',
            filter: 'invert(100%)',
            pointerEvents: 'none',
            top: '-3.9rem',
            left: '-1rem',
            zIndex: 1,
        },
    }

    return (
        <div style={ styles.wrapper }>
            <img
                src={ logo }
                alt="logo"
                style={ styles.logo }
            />
            <div
                className="header--wrapepr"
                style={ styles.circle }
            >
        <Bg />
            </div>
        </div>
    )
}

class Header extends React.Component {
    constructor(props) {
        super(props)

        const a = this.updateSidebarIntersection()
        console.log(a)
        this.updateSidebarIntersection = this.updateSidebarIntersection.bind(this)
    }

    updateSidebarIntersection() {
        const vh = document.documentElement.clientHeight / 100
        const vw = document.documentElement.clientWidth / 100
        const { radius, centerX, centerY } = styleConstants
        const { unitHeightJs, unitWidthJs } = appStyles

        // unite conversions
        const unitWidth = unitWidthJs
        const unitHeight = unitHeightJs * vh
        const r = radius * vh
        const Cx = centerX * vw
        const Cy = centerY * vh

        // solve for x = half of screen minus sidebar width
        const x =  3 * unitWidth

        // solve for the determinant
        const delta = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
        const borderOffset = ((2*Cy) + Math.sqrt(delta)) / 2

        this.props.updateSidebarIntersection(borderOffset)
        console.log(borderOffset)
    }

    render() {
        return <HeaderDumb { ...this.props } />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)

export {
    styleConstants,
}
