// @flow

import * as React from 'react'
import { connect }from 'react-redux'
import { compose, withState, lifecycle } from 'recompose'
import './styles/Footer.css'
import { INTRO_FINISHED } from '../../constants.js'
import { toggleSidebar } from '../../reducer/actions/Sidebar.js'
import {
    updateIsFooterOpened,
    updateCurrentFooterPage,
} from '../../reducer/actions/App.js'
import toggleButton from '../img/toggle-sidebar.svg'
import arrowImg from '../img/arrow.svg'
import AboutUs from '../About/About.jsx'

import { Svg } from '../Header/Header.jsx'

import aboutBg from '../img/footerBgs/contact.png'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
} from './FooterTypes.jsx'

import getStyles, {
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
        windowHeight: state.appReducer.windowHeight,
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
            <div
                style={ styles.closeFooterArrowWrapper }
                onClick={ () => props.updateIsFooterOpened(false) }>
                <img
                    src={ arrowImg }
                    alt="close"
                    style={ styles.closeFooterArrowImg } />
            </div>
            <div
                style={ styles.footerBackground }
                className={ "footer-background " }>
                <div style={{ position: 'relative', width: '100vw' }}>
                        {
                            props.introKeyframe >= INTRO_FINISHED + 1 ?
                                    <AboutUs
                                        bgUrl={ props.bgUrl }
                                        opacity={ props.isFooterOpened ? 1 : 0 }
                                        windowWidth={ props.windowWidth }
                                    />
                            :
                                ''
                        }

                        <div style={ styles.svg }>
                            <div style={{ backgroundColor: 'white', height: '100vh' }}>
                            </div>
                            <Svg
                                windowWidth={ props.windowWidth }
                                windowHeight={ props.windowHeight }
                                color="rgba(255, 255, 255, 1)"
                            />
                        </div>
                </div>
            </div>
            <div
                style={{
                    ...styles.toggleSidebarButton,
                    ...(props.isSidebarOpened ? {} : styles.rotatedCloseButton),
                }}
                onClick={ props.toggleSidebar }
            >
                <img
                    src={ toggleButton }
                    alt="toggle sidebar"
                    className="transform-on-hover" />
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

const footerLifecycle= {
    componentDidMount() {},
}

const FooterSmart = compose(
    withState(
        'bgUrl',
        'setBgUrl',
        aboutBg,
    ),
    lifecycle(footerLifecycle),
)(FooterDumb)


const ConnectedFooter: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterSmart)

export default ConnectedFooter
