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
    const styles = getStyles(props)

    const tmp = []

    for(let i in props.comps) {
        const Comp = props.comps[i]

        const reduxState = state => ({
            windowWidth: state.appReducer.windowWidth,
        })

        const SmartComp = connect(reduxState)(Comp)

        tmp.push(<div key={ i } style={ styles.centerWrapper }><SmartComp /></div>)
    }

    props.setChildComps(tmp)

    //props.setChildComps(<SmartComps />)
}

const updateChildComps = (props, nextProps) => {
    const tmp = [...nextProps.childComps]

    for(let i in props.comps) {
        const NextComp = nextProps.comps[i]

            console.log(`=======${i}=========`)
        if(props.comps[i] !== nextProps.comps[i]) {
            const reduxState = state => ({
                windowWidth: state.appReducer.windowWidth,
            })

            const SmartComp = connect(reduxState)(NextComp)
            const Cc = connect(reduxState)(() => <div style={ getStyles(props).centerWrapper }><SmartComp key={ i } /></div>)
            tmp[i] = <Cc key={ i } />
        }
    }

    props.setChildComps(tmp)
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
                    updateChildComps(this.props, nextProps)
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
