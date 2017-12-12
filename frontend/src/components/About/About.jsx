// @flow

import * as React from 'react'
import { connect }from 'react-redux'

import getStyles from './AboutStyles.jsx'

import type {
    Props,
    ReduxState,
    OwnProps,
} from './AboutTypes.jsx'

import SidePanel, { sidePanelTypes } from '../Presentation/SidePanel/SidePanel.jsx'

import { footerPage } from '../../reducer/App.js'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
    return {
        currentFooterPage: state.appReducer.currentFooterPage,
    }
}

const text = {}

text[footerPage.LEGALS] = {
    title: 'legals',
}

text[footerPage.CONTACT] = {
    title: 'contact',
}

text[footerPage.LOGIN] = {
    title: 'login',
}

const AboutUs: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    const title = text[props.currentFooterPage].title

    return (
        <div style={ styles.wrapper }>
            <SidePanel type={ sidePanelTypes.INVERTED }>
                { title }
            </SidePanel>
        </div>
    )
}

const ConnectedAboutUs: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
)(AboutUs)

export default ConnectedAboutUs
