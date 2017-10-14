import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux'
import './styles/Footer.css'
import { FOOTER_FINAL, INTRO_FINISHED } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import { updateIsFooterOpened } from '../../reducer/actions/App.js'
import toggleButton from '../img/toggle-sidebar.svg'
import { styles as appStyles } from '../../constants.js'
import { slides } from '../pages/Pages.jsx'
import arrowImg from '../img/arrow.svg'

const reduxStatePropTypes = {
  introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
    return {
        introKeyframe: state.appReducer.introKeyframe,
        isSidebarOpened: state.sidebarReducer.isSidebarOpened,
        appTheme: state.appReducer.appTheme,
        currentPage: state.appReducer.currentPage,
        updateCurrentPage: state.appReducer.goToPage,
        isFooterOpened: state.appReducer.isFooterOpened,
        sidebarHeaderIntersection: state.headerReducer.sidebarIntersection,
    }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
      toggleSidebar: () => dispatch(toggleSidebar()),
      updateIsFooterOpened: isFooterOpened => dispatch(updateIsFooterOpened(isFooterOpened)),
  }
}

const AboutUs = () => {
    const sidebarWidth = 'calc(' + appStyles.sidebar.widthFactor + ' * ' + appStyles.unitWidth + ')'
    const styles = {
        wrapper: {
            width: 'calc(100vw - ' + sidebarWidth + ')',
            marginLeft: sidebarWidth,
            color: 'black',
            marginTop: '8rem', // footer height
        },
        p: {
            padding: appStyles.unitHeight + ' ' + appStyles.unitWidth
        },
        h1: {
            padding: appStyles.unitHeight + ' ' + appStyles.unitWidth
        },
    }

    return (
        <div style={ styles.wrapper }>
            <h1 style={ styles.h1 }>
                About Us
            </h1>
            <p style={ styles.p }>
                Email us at : <a href="mailto:joey@novamedia.nyc">joey@novamedia.nyc</a>
            </p>
        </div>
    )
}


const PresentationControls = ({ updateCurrentPage, currentPage, opacity, isFooterOpened }) => {
    const styles = {
        wrapper: {
            fontSize: '5rem',
            color: 'red',
            zIndex: 1,
            position: 'absolute',
            transform: 'translateX(-50%)',
            left: '50%',
            display: 'flex',
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            height: 'calc(2.1 * ' + appStyles.unitHeight + ' / 3)',
            opacity: isFooterOpened ? 0 : 1,
            transition: 'opacity 0.5s linear',
        },
        controlButtonWrapper: {
            opacity: opacity,
            width: '1rem',
            height: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(220, 220, 220, 0.9)',
            margin: '0.5rem',
            cursor: 'pointer',
        },
        controlButtonActive: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
    }

    const ControlButton = props => (
        <div
            onClick={ () => updateCurrentPage(props.targetPage) }
            className="transform-on-hover"
            style={ { ...styles.controlButtonWrapper, ...(props.isActive ? styles.controlButtonActive : {}) } }>
        </div>
    )

    const presentationSlides = slides.map((e, i) => [e, i]).filter(e => e[0].pid === slides[currentPage].pid)

    const buttons = presentationSlides.map((e, i) => presentationSlides.length === 1 ? '' : (
        <ControlButton
            key={ i }
            targetPage={ e[1] }
            isActive={ e[1] === currentPage ? true : false }
        />
    ))

    console.log(presentationSlides)

    return (
        <div style={ styles.wrapper }>
            { buttons }
        </div>
    )
}

const FooterDumb = props => {
    const height = appStyles.unitHeight
    const width = height
    const isIntroFinished = props.introKeyframe >= INTRO_FINISHED ? true : false


    const theme = appStyles.themes[props.appTheme]

    const footerBgCenter = {
        x: '50vw',
        y: '1430vh',
        radius: '1340vh',
    }
    footerBgCenter.diam = 'calc(' + footerBgCenter.radius + ' * 2)'

    if(!isIntroFinished) {
        footerBgCenter.x = '100vw'
        footerBgCenter.y = '1400vh'
    }

    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const footerHeight = 2.4 * appStyles.unitHeightJs * vh // 2.4 * unitHeight seems to be header height on all screen sizes (vs 3 as coef which is what it's supposed to be...)

    // To find intersection point of header and sidebar offset caused by border radius
    let footerRadiusOffset = (() => {
        const radius = 1340 //footerBgCenter
        const { unitWidthJs } = appStyles
        const centerX = 50 //footerBgCenter.x
        const centerY = 1340 //footerBgCenter.y

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

        return (borderOffset - 2 * Cy)
    })()
    let footerOffset = props.isFooterOpened && isIntroFinished ? 'calc(100vh - ' + footerHeight + 'px - ' + footerRadiusOffset + 'px - ' + props.sidebarHeaderIntersection + 'px)' : '0vh'


    const styles = {
        footerWrapper: {
            display: 'flex',
            height: footerHeight,
            zIndex: props.introKeyframe >= INTRO_FINISHED + 1 ? 'inherit' : 100,
        },
        footerBackground: {
            position: 'absolute',
            height: footerBgCenter.diam,
            width: footerBgCenter.diam,
            borderRadius: footerBgCenter.diam,
            transition: 'transform 0.5s, background-color 0.5s linear',
            top: 'calc(0vh - ' + footerBgCenter.radius + '))',
            left: 'calc(0vh - ' + footerBgCenter.radius + '))',
            transform: 'translateY(calc(' + footerBgCenter.y + ' - ' + footerOffset + '))translateX(' + footerBgCenter.x + ')',
            backgroundColor: isIntroFinished ? theme.footerBgColor : 'white',
            display: 'flex',
            justifyContent: 'center',
        },
        wrapper: {
            transition: props.introKeyframe >= INTRO_FINISHED ? 'background-color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc : 'transform 2s linear'
        },
        toggleSidebarButton: {
            position: 'absolute',
            height,
            width,
            transition: 'transform ' + appStyles.sidebar.hoverTransition.length + ', opacity ' + appStyles.sidebar.hoverTransition.length + appStyles.sidebar.hoverTransition.type,
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            left: 'calc(' + appStyles.sidebar.widthFactor + ' / 2 * ' + appStyles.unitWidth + ' - ' + height + ' / 2 - ' + width + ' / 3)',
            transform: 'rotateZ(45deg)translateX(calc(0.99 / 3 * ' + width + '))translateY(calc(-0.50 / 3 * ' + height + '))',
            cursor: 'pointer',
            opacity: props.introKeyframe >= INTRO_FINISHED ? 1 : 0,
        },
        rotatedCloseButton: {
            transform: 'inherit',
        },
        quickLinks: {
            transition: 'opacity 0.5s linear',
            position: 'absolute',
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            height: 'calc(2.1 * ' + appStyles.unitHeight + ' / 3)',
            right: 'calc(' + appStyles.unitWidth + ')',
            fontSize: appStyles.UI.P.fontSize,
            color: 'rgba(200, 200, 200, 0.9)',
            display: 'flex',
            alignItems:'center',
            cursor: 'pointer',
            opacity: (props.introKeyframe >= INTRO_FINISHED + 1 && !props.isFooterOpened) ? 1 : 0,
        },
        closeFooterArrowWrapper: {
            transition: 'transform 0.5s, background-color 0.5s linear',
            transform: 'translateY(calc(-' + appStyles.unitHeight + ' / 4 - ' + footerOffset + '))translateX(' + footerBgCenter.x + ')',
            height: '0px',
            color: 'red',
            position: 'relative',
        },
        closeFooterArrowImg: {
            height: '2rem',
            width: '2rem',
            position: 'absolute',
            bottom: '100%',
            cursor: 'pointer',
            opacity: props.isFooterOpened ? 1 : 0,
            transform: 'translateX(-50%)rotateZ(90deg)',
        }
    }

    return (
        <div
            className="footer--wrapper"
            style={ styles.footerWrapper }>
            <div style={ styles.closeFooterArrowWrapper } onClick={ () => props.updateIsFooterOpened(false) }>
                <img src={ arrowImg } alt="close" style={ styles.closeFooterArrowImg }/>
            </div>
            <div>
                <div
                    style={ styles.footerBackground }
                    className={
                        "footer-background "
                        + (props.introKeyframe >= FOOTER_FINAL ? " final-position " : "init-position")
                    }
                >
                    {
                        props.introKeyframe >= INTRO_FINISHED + 1 ?
                            <AboutUs />
                        :
                            ''
                    }
                </div>
            </div>
            <div
                style={{
                    ...styles.toggleSidebarButton,
                    ...(props.isSidebarOpened ? {} : styles.rotatedCloseButton),
                }}
                onClick={ props.toggleSidebar }
            >
                <img src={ toggleButton } alt="toggle sidebar" className="transform-on-hover" />
            </div>
            <PresentationControls {...props} opacity={ props.introKeyframe >= INTRO_FINISHED ? 1 : 0 } />
            <div style={ styles.quickLinks }>
                <span onClick={ () => props.updateIsFooterOpened(true) }>About Us</span>
            </div>
        </div>
    )
}

FooterDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

FooterDumb.defaultProps = {
}

class Footer extends Component {
  componentDidMount() {

  }

  render() {
    return <FooterDumb
        { ... this.props } />
  }
}

Footer.propTypes = {
  ...FooterDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
