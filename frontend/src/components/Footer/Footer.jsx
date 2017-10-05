import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux'
import './styles/Footer.css'
import { FOOTER_FINAL } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import toggleButton from '../img/toggle-sidebar.svg'
import { styles as appStyles } from '../../constants.js'

const reduxStatePropTypes = {
  introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
    return {
        introKeyframe: state.appReducer.introKeyframe,
        isSidebarOpened: state.sidebarReducer.isSidebarOpened,
        appTheme: state.appReducer.appTheme,
    }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
      toggleSidebar: () => dispatch(toggleSidebar()),
  }
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
