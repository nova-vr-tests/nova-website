import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux'
import './styles/Footer.css'
import { FOOTER_FINAL } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import toggleButton from '../img/toggle-sidebar.svg'
import { styles as appStyles } from '../../constants.js'
import { slides } from '../pages/Pages.jsx'

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
    }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
      toggleSidebar: () => dispatch(toggleSidebar()),
  }
}


const PresentationControls = ({ updateCurrentPage, currentPage }) => {
    const styles = {
        wrapper: {
            fontSize: '5rem',
            color: 'red',
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
            transform: 'translateX(-50%)',
            left: '50%',
            display: 'flex',
            marginBottom: 'calc(' + appStyles.unitHeight + ' / 2)',
        },
        controlButtonWrapper: {
            width: '1rem',
            height: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            margin: '0.5rem',
            transition: 'background-color 5s linear',
            cursor: 'pointer',
        },
        controlButtonActive: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }
    }

    const ControlButton = props => (
        <div
            onClick={ () => updateCurrentPage(props.targetPage) }
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


    const theme = appStyles.themes[props.appTheme]

    const styles = {
        wrapper: {
            backgroundColor: theme.footerBgColor,
            transition: 'background-color ' + appStyles.slideTransitionTime / 1000 + 's ' + appStyles.slideTransitionFunc,
        },
        toggleSidebarButton: {
            position: 'absolute',
            height,
            width,
            transition: 'transform ' + appStyles.sidebar.hoverTransition.length + appStyles.sidebar.hoverTransition.type,
            bottom: 'calc(' + appStyles.unitHeight + ' / 3)',
            left: 'calc(' + appStyles.sidebar.widthFactor + ' / 2 * ' + appStyles.unitWidth + ' - ' + height + ' / 2 - ' + width + ' / 3)',
            transform: 'rotateZ(45deg)translateX(calc(0.99 / 3 * ' + width + '))translateY(calc(-0.50 / 3 * ' + height + '))',
            cursor: 'pointer',
        },
        rotatedCloseButton: {
            transform: 'inherit',
        },
    }

    return (
        <div className="footer--wrapper">
            <div
                style={ styles.wrapper }
                className={
            "footer-background "
            + (props.introKeyframe <= FOOTER_FINAL ? " final-position " : "init-position")
            }>
            </div>
            <div
                style={{
                    ...styles.toggleSidebarButton,
                    ...(props.isSidebarOpened ? {} : styles.rotatedCloseButton),
                }}
                onClick={ props.toggleSidebar }
            >
                <img src={ toggleButton } alt="toggle sidebar" />
            </div>
            <PresentationControls {...props} />
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
