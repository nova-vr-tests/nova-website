import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import getStyles, {
} from './SidePanelDrawerStyles.jsx'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

const SidePanelDrawer = props => {
    const styles = getStyles(props)

    const { Comp1, Comp2 } = props

    return (
        <div
            style={ styles.wrapper }
            className="SidePanelDrawer--wrapper">
            <div style={ styles.leftWrapper }>
                <Comp1 />
            </div>
            <div style={ styles.rightWrapper }>
                <Comp2 />
            </div>
        </div>
    )
}

SidePanelDrawer.defaultProps = {
    Comp1: () => <div></div>,
    Comp2: () => <div></div>,
    position: 0, // 0 = left visible, 1 = right visible
}


const SmartComp = compose(
    withState(
    ),
    lifecycle({
    })
)(SidePanelDrawer)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
