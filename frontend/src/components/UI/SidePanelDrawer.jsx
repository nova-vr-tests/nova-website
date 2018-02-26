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
    windowWidth: state.appReducer.windowWidth,
})

const mapDispatchToProps = dispatch => ({
})

const SidePanelDrawer = props => {
    const styles = getStyles(props)

    return (
        <div
            style={ styles.mainWrapper }
            className="SidePanelDrawer--wrapper">
            <div
                style={ styles.wrapper }>
                { props.childComps }
            </div>
        </div>
    )
}

SidePanelDrawer.defaultProps = {
    comps: [],
    position: 0, // 0 = left visible, 1 = right visible
    desktopLockDrawer: true,
    unlockPosition: 0,
    desktopLockPosition: 0,
}

const initChildComps = props => {

    const Comps = () => props.comps.map((E, i) => {
        const styles = getStyles(props)

        return (
            <div
                key={ i }
                style={{
                ...styles.centerWrapper,
                }}>
                <E />
            </div>
        )
    })

    const reduxState = state => ({
        windowWidth: state.appReducer.windowWidth,
    })

    const SmartComps = connect(reduxState)(Comps)

    props.setChildComps(<SmartComps />)
}

const SmartComp = compose(
    withState(
        'childComps',
        'setChildComps',
        'ss',
    ),
    lifecycle({
        componentDidMount() {
            initChildComps(this.props)
        },
        componentWillUpdate(nextProps) {
            if(this.props.windowWidth === nextProps.windowWidth
                && this.props.comps !== nextProps.comps) {
                    initChildComps(nextProps)
            }
        },
    })
)(SidePanelDrawer)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

const SmartConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp

export {
    SmartConnectedComp as SmartSidePanelDrawer,
}
