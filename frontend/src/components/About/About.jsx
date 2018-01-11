// @flow

import * as React from 'react'
import { connect }from 'react-redux'

import getStyles from './AboutStyles.jsx'

import type {
    Props,
    ReduxState,
    OwnProps,
} from './AboutTypes.jsx'

import Login from './Login/Login.jsx'

import SidePanel, { sidePanelTypes } from '../Presentation/SidePanel/SidePanel.jsx'

import { footerPage } from '../../reducer/App.js'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        currentFooterPage: state.appReducer.currentFooterPage,
    }
}

const text = {}

const legalsContent = (
    <div>
        <h2 style={{ marginTop: 0 }}>Terms and conditions of use</h2>
        <p>
            We maintain this site as a resource and communication portal. Terms of Service apply to anyone browsing the website. Accessing the site is acceptance without limitation or qualification of the following Terms and Conditions. If you do NOT accept the Terms and Conditions, please discontinue your use of this site.
        </p>
        <h2>Privacy Policy</h2>
        <p>
            We use basic Google Analytics to improve our services. <a href="https://tools.google.com/dl-page/gaoptout/">Opt-out of Google Analytics.</a>
        </p>
    </div>
)

const contactContent = (
    <div>
        <p style={{ marginTop: 0 }}>
            Thank you for your interest in Nova XR Media. Please email us with any question:
        </p>
        <strong><a href="mailto: joe@novamedia.nyc">joe@novamedia.nyc</a></strong>
    </div>
)

const loginContent = <Login />


text[footerPage.LEGALS] = {
    title: 'Legals',
    content: legalsContent
}

text[footerPage.CONTACT] = {
    title: 'Contact',
    content: contactContent
}

text[footerPage.LOGIN] = {
    title: 'Login',
    content: loginContent
}

const AboutUs: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    const title = text[props.currentFooterPage].title
    const content = text[props.currentFooterPage].content

    return (
        <div style={ styles.wrapper }>
            <SidePanel
                marginTop={ styles.sidePanel.marginTop }
                type={ sidePanelTypes.INVERTED }>
                <div style={ styles.title }>
                    <h2 style={ styles.h2 }>{ title }</h2>
                </div>
                <div style={ styles.content }>
                    { content }
                </div>
            </SidePanel>
        </div>
    )
}

const ConnectedAboutUs: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
)(AboutUs)

export default ConnectedAboutUs
