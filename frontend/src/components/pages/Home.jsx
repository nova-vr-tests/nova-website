import * as React from 'react'

import { connect } from 'react-redux'
import { lifecycle } from 'recompose'

import { push } from 'react-router-redux'

import SidePanelLink from '../UI/SidePanelLink.jsx'
import MainPanel from '../MainPanel/MainPanel.jsx'
import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

import { styles as appStyles } from '../../constants.js'

import SidePanelProductsHeader from '../UI/SidePanelProductsHeader.jsx'

import novaLogo from '../img/home/logo-home-picto.png'
import whoWeArePicto from '../img/home-squares/who-we-are.png'
import whatWeDoPicto from '../img/home-squares/what-we-do.png'
import BuildXRPicto from '../img/home-squares/build.png'

import { ContentWrapper } from '../Blog/Blog.jsx'

import {
    updateSidePanelHeader,
    updateMainPanelContent,
    updateMainPanelIsOpened,
    updateLinePosition,
    updateIsFooterOpened,
    updateCurrentFooterPage,
} from '../../reducer/actions/App.js'

const mapStateToProps = function(state) {
    return {
        routing: state.routing,
        windowWidth: state.appReducer.windowWidth,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        goTo: url => dispatch(push(url)),
        updateSidePanelHeader: header => dispatch(updateSidePanelHeader(header)),
        updateMainPanel: comp => dispatch(updateMainPanelContent(comp)),
        updateMainPanelIsOpened: isOpened => dispatch(updateMainPanelIsOpened(isOpened)),
        updateLinePosition: position => dispatch(updateLinePosition(position)),
        updateIsFooterOpened: isOpened => dispatch(updateIsFooterOpened(isOpened)),
        updateCurrentFooterPage: page => dispatch(updateCurrentFooterPage(page)),
    }
}

/**
   HOME PAGE
**/

const HomePageContent = props => {
    const styles = {
        wrapper: {
            color: 'white',
        },
    }

    const str = `# &laquo;Dream Awake&raquo;

!!! We provide XR Media solutions for businesses. Our work includes sourcing development, production management, and market entry.`

    return (
        <div style={ styles.wrapper }>
            <MarkdownParser
                useWhiteFont={ props.useWhiteFont }
                content={ str } />
        </div>
    )
}

HomePageContent.defaultProps = {
    useWhiteFont: false,
}

const HomePage = props => {
    let textDisplay = 'none'

    if(appStyles.mediaQueries.tablet > document.documentElement.clientWidth) {
        textDisplay = 'block'
    }

    const styles = {
        text: {
            display: textDisplay,
        },
        bottom: {
            height: `calc(4 * ${appStyles.unitHeight})`,
        }
    }

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <SidePanelLink
                onClickCallback={ () => props.goTo('/about-us')}
                pictoUrl={ whoWeArePicto }
                isSquarePicto={ true }
                title="Who We Are" />
            <SidePanelLink
                onClickCallback={ () => props.goTo('/products') }
                pictoUrl={ whatWeDoPicto }
                isSquarePicto={ true }
                title="What We Do" />
            <SidePanelLink
              onClickCallback={ () => { props.updateIsFooterOpened(true); props.updateCurrentFooterPage(4) } }
                isSquarePicto={ true }
                pictoUrl={ BuildXRPicto }
                title="Build XR" />
            <div style={ styles.bottom }>
            </div>
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
        introP: {
            height: 'calc(4 * ' + appStyles.unitHeight + ')',
            margin: 0,
            display: 'none',
            alignItems: 'center',
            position: 'absolute',
            transform: 'translateY(-100%)',
            minWidth: `calc(8 * ${appStyles.unitWidth})`,
            justifyContent: 'center',
        },
        pWrapper: {
            marginTop: `calc(2 * ${appStyles.unitHeight})`,
            display: 'none',
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
        },
        headerWrapper: {
            marginBottom: `calc(1 * ${appStyles.unitHeight})`,
            filter: 'invert(100%)',
        },
    }


    return (
                    <div style={ styles.pWrapper }>
                        <div style={ styles.headerWrapper }>
                            <SidePanelProductsHeader
                                pictoUrl={ window.origin + novaLogo }
                                forceShowPicto={ true }
                                showArrow={ false } />
                        </div>
                        <ContentWrapper>
                          <HomePageContent />
                        </ContentWrapper>
                    </div>
    )
}

MainPanel.defaultProps = {
}

const initHome = props => {
    if(props.routing.location.pathname === "/") {
        props.updateSidePanelHeader(() => (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <p style={{ padding: `calc(0.5 * ${appStyles.unitWidth})` }}>
                (XR) Extended Reality refers to immersive digital experiences, such as virtual and augmented reality.
              </p>
            </div>
        ))
        props.updateMainPanel(HomeMainPanel)
        props.updateMainPanelIsOpened(true)
    }
}

const HomePageSmart = lifecycle({
    componentDidMount() {
        initHome(this.props)
    },
    componentWillReceiveProps(nextProps) {
        initHome(nextProps)
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
