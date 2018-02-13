import * as React from 'react'

import { connect } from 'react-redux'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

import { styles as appStyles } from '../../constants.js'

import novaLogo from '../img/nova-logo.svg'

const mapStateToProps = function(state) {
    return {
        windowWidth: state.appReducer.windowWidth,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
    }
}

/**
   HOME PAGE
**/

const HomePage = props => {
    const source = `XR is an abbreviation for “Extended Reality” which is a flexible and far-reaching term for immersive 3D media, inclusive of virtual and augmented reality.

XR technologies are being deployed in most industries to increase revenue or decrease internal costs. To read more about how XR Media technologies changing space exploration, entertainment, retail, travel, health care, journalism, marketing and more, visit our services page.`

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

const ConnectedHomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

const MainPanel = props => {
    const styles = {
        wrapper:{
            transition: 'opacity 0.5s linear',
            position: 'absolute',
            width: 'calc(7 * ' + appStyles.unitWidth + ')',
            marginLeft: 'calc(3 * ' + appStyles.unitWidth + ')',
            marginTop: 'calc(4 * ' + appStyles.unitWidth + ')',
        },
        h1: {
            height: 'calc(4 * ' + appStyles.unitHeight + ')',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
        },
        p: {
            fontSize: '2.5vh',
        },
        logo: {
            position: 'absolute',
            height: 'calc(2 * ' + appStyles.unitHeight + ')',
            marginBottom: 'calc(2 * ' + appStyles.unitHeight + ')',
            marginLeft: 'calc(2 * ' + appStyles.unitWidth + ')',
            bottom: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontSize: '1rem',
        },
        img: {
            height: '100%',
            marginBottom: '0.5rem',
            filter: 'invert(100%)',
        }
    }


    return (
        <div
            className={ 'MainPanel--wrapper' }
            style={ styles.wrapper }>
            <div style={ styles.logo }>
                <img
                    style={ styles.img }
                    alt="logo"
                    src={ novaLogo } />
                    <span>XR Media</span>
            </div>
            <h1 style={ styles.h1 }>
                { '<< Dream Awake >>' }
            </h1>
            <p style={ styles.p }>
                We provide XR Media solutions for business. Our work includes sourcing development, production management, and market entry.
            </p>
        </div>
    )
}

MainPanel.defaultProps = {
}

export default ConnectedHomePage

export {
    MainPanel,
}
