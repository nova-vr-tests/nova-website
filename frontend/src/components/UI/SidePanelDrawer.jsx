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

    const { comps } = props

    const Comps = () => comps.map((E, i) =>
        <div
            key={ i }
            style={{
               ...styles.centerWrapper,
            }}>
            <E />
        </div>
    )

    return (
        <div
            style={ styles.mainWrapper }
            className="SidePanelDrawer--wrapper">
            <div
                style={ styles.wrapper }>
                <Comps />
            </div>
        </div>
    )
}

SidePanelDrawer.defaultProps = {
    comps: [],
    position: 0, // 0 = left visible, 1 = right visible
    desktopLockDrawer: true,
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
)(SidePanelDrawer)

const SmartConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp

export {
    SmartConnectedComp as SmartSidePanelDrawer,
}
