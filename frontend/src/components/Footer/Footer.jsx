// @flow

import * as React from 'react'
import { connect }from 'react-redux'
import './styles/Footer.css'
import { FOOTER_FINAL, INTRO_FINISHED } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import {
    updateIsFooterOpened,
    updateCurrentFooterPage,
} from '../../reducer/actions/App.js'
import toggleButton from '../img/toggle-sidebar.svg'
import { slides } from '../pages/Pages.jsx'
import arrowImg from '../img/arrow.svg'
import AboutUs from '../About/About.jsx'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
    PresentationControlsProps,
    ControlButtonProps,
} from './FooterTypes.jsx'

import getStyles, {
    getPresentationControlsStyles,
} from './FooterStyles.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'

import { footerPage } from '../../reducer/App.js'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        introKeyframe: state.appReducer.introKeyframe,
        isSidebarOpened: state.sidebarReducer.isSidebarOpened,
        appTheme: state.appReducer.appTheme,
        currentPage: state.appReducer.currentPage,
        updateCurrentPage: state.appReducer.goToPage,
        isFooterOpened: state.appReducer.isFooterOpened,
        sidebarHeaderIntersection: state.headerReducer.sidebarIntersection,
        windowWidth: state.appReducer.windowWidth,
        currentFooterPage: state.appReducer.currentFooterPage,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
	return {
      toggleSidebar: () => dispatch(toggleSidebar()),
      updateIsFooterOpened: isFooterOpened => dispatch(updateIsFooterOpened(isFooterOpened)),
      updateCurrentFooterPage: currentFooterPage => dispatch(updateCurrentFooterPage(currentFooterPage)),
  }
}


const PresentationControls: React.StatelessFunctionalComponent<PresentationControlsProps> = props => {
    const { updateCurrentPage, currentPage } = props
    const styles = getPresentationControlsStyles(props)

    const ControlButton: React.StatelessFunctionalComponent<ControlButtonProps> = props => (
        <div
            onClick={ () => updateCurrentPage(props.targetPage) }
            className="transform-on-hover"
            style={ { ...styles.controlButtonWrapper, ...(props.isActive ? styles.controlButtonActive : {}) } }>
        </div>
    )

    const presentationSlides = slides.map((e, i) => [e, i]).filter(e => e[0].pid === slides[currentPage].pid)

    const buttons: React.Node = presentationSlides.map((e, i) => presentationSlides.length === 1 ? '' : (
        <ControlButton
            key={ i }
            targetPage={ e[1] }
            isActive={ e[1] === currentPage ? true : false }
        />
    ))


    return (
        <div style={ styles.wrapper }>
            { buttons }
        </div>
    )
}

const FooterDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    const openFooter = (footerPage: number) => {
        props.updateCurrentFooterPage(footerPage)
        props.updateIsFooterOpened(true)
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
                            <AboutUs
                                opacity={ props.isFooterOpened ? 1 : 0 }
                                windowWidth={ props.windowWidth }
                            />
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
            <div style={ styles.quickLinks }>
                <span
                    onClick={ () => openFooter(footerPage.LEGALS) }
                    style={{
                        color: props.currentFooterPage === footerPage.LEGALS  && props.isFooterOpened ? 'black' : 'rgba(0, 0, 0, 0.4)',
                        transition: 'color 0.1s linear',
                    }}
                >
                    Legals
                </span>
                <span
                    onClick={ () => openFooter(footerPage.CONTACT) }
                    style={{
                        color: props.currentFooterPage === footerPage.CONTACT && props.isFooterOpened ? 'black' : 'rgba(0, 0, 0, 0.4)',
                        marginLeft: '1rem',
                        transition: 'color 0.1s linear',
                    }}
                >
                    Contact
                </span>
                <span
                    onClick={ () => openFooter(footerPage.LOGIN) }
                    style={{
                        color: props.currentFooterPage === footerPage.LOGIN   && props.isFooterOpened ? 'black' : 'rgba(0, 0, 0, 0.4)',
                        marginLeft: '1rem',
                        transition: 'color 0.1s linear',
                    }}
                >
                    Login
                </span>
            </div>
        </div>
    )
}


const ConnectedFooter: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterDumb)

export default ConnectedFooter
