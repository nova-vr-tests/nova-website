import * as React from 'react'

import { connect } from 'react-redux'
import { lifecycle } from 'recompose'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'
import MainPanel from '../MainPanel/MainPanel.jsx'

import { styles as appStyles } from '../../constants.js'

import novaLogo from '../img/home/logo.png'

import {
    updateSidePanelHeader,
    updateMainPanelContent,
    updateMainPanelIsOpened,
    updateLinePosition,
} from '../../reducer/actions/App.js'

const mapStateToProps = function(state) {
    return {
        windowWidth: state.appReducer.windowWidth,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        updateSidePanelHeader: header => dispatch(updateSidePanelHeader(header)),
        updateMainPanel: comp => dispatch(updateMainPanelContent(comp)),
        updateMainPanelIsOpened: isOpened => dispatch(updateMainPanelIsOpened(isOpened)),
        updateLinePosition: position => dispatch(updateLinePosition(position)),
    }
}

/**
   HOME PAGE
**/

const HomePage = () => {
    const source = `XR is an abbreviation for “Extended Reality” which is a flexible and far-reaching term for immersive 3D media, inclusive of Virtual and Augmented Reality.

XR technologies are already increasing revenue and decreasing internal costs in most industries. Visit our "Consultation" page to read about XR's influence on entertainment, retail, travel, healthcare, journalism, marketing and many others.`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

HomePage.defaultProps = {
}

const HomeMainPanel = () => {
    const styles = {
        wrapper:{
            transition: 'opacity 0.5s linear',
            position: 'relative',
            width: 'calc(7 * ' + appStyles.unitWidth + ')',
            marginLeft: 'calc(3 * ' + appStyles.unitWidth + ')',
            marginTop: 'calc(4 * ' + appStyles.unitWidth + ')',
        },
        h1: {
            height: 'calc(4 * ' + appStyles.unitHeight + ')',
            margin: 0,
            display: 'none',
            alignItems: 'center',
            position: 'absolute',
            transform: 'translateY(-100%)',
            fontSize: '2.5rem',
            minWidth: `calc(8 * ${appStyles.unitWidth})`,
            justifyContent: 'center',
        },
        pWrapper: {
            fontSize: '2.5vh',
            position: 'absolute',
            top: `calc(11 * ${appStyles.unitHeight})`,
            height: `calc(4 * ${appStyles.unitHeight})`,
            margin: '0',
            width: `calc(100% + 3 * ${appStyles.unitWidth})`,
            transform: `translateX(calc(-3 * ${appStyles.unitWidth}))`,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        p: {
            maxWidth: `calc(8 * ${appStyles.unitWidth})`,
            textAlign: 'center',
        },
        logo: {
            height: 'calc(4 * ' + appStyles.unitHeight + ')',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            transform: 'translateY(-135%)translateX(4%)',
            fontSize: '2.5rem',
            minWidth: `calc(8 * ${appStyles.unitWidth})`,
            justifyContent: 'center',
        },
        img: {
            width: `calc(4.5 * ${appStyles.unitWidth})`,
            marginBottom: '0.5rem',
            filter: 'invert(100%)',
        }
    }


    return (
                    <div style={ styles.pWrapper }>
                        <div
                            key={ 1 }
                            style={ styles.logo }>
                            <img
                                style={ styles.img }
                                alt="logo"
                                src={ novaLogo } />
                        </div>
                        <h1
                            key={ 2 }
                            style={ styles.h1 }>
                            { 'Dream Awake' }
                        </h1>
                        <p
                            key={ 3 }
                            style={ styles.p }>
                            We provide XR Media solutions for businesses. Our work includes sourcing development, production management, and market entry.
                        </p>
                    </div>
    )
}

MainPanel.defaultProps = {
}

const HomePageSmart = lifecycle({
    componentDidMount() {
        this.props.updateSidePanelHeader(() => (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ fontStyle: 'italic', letterSpacing: '0.3rem' }}>Dream Awake</h1>
            </div>
        ))
        this.props.updateMainPanel(HomeMainPanel)
        this.props.updateMainPanelIsOpened(true)
    },
})(HomePage)

const ConnectedHomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageSmart)


export default ConnectedHomePage

export {
    HomeMainPanel,
}
