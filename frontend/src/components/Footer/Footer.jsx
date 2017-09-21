import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux'
import './styles/Footer.css'
import { FOOTER_FINAL } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import toggleButton from '../img/toggle-sidebar.svg'

const reduxStatePropTypes = {
  introKeyframe: PropTypes.number,
}

const mapStateToProps = function(state) {
    return {
        introKeyframe: state.appReducer.introKeyframe,
        isSidebarOpened: state.sidebarReducer.isSidebarOpened,
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
    const styles = {
        toggleSidebarButton: {
            position: 'absolute',
            height: '3rem',
            width: '3rem',
            transition: 'transform 0.3s linear',
            bottom: '1.5rem',
            left: '1.5rem',
            transform: 'rotateZ(-45deg)translateX(-0.99rem)translateY(-0.38rem)',
        },
        rotatedCloseButton: {
            transform: 'inherit',
        },
    }

    return (
        <div className="footer--wrapper">
            <div className={
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
