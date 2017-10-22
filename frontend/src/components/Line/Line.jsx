// @flow

import * as React from 'react'
import { connect }from 'react-redux'

import getStyles from './LineStyles.jsx'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
} from './LineTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'


const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
	return {
      linePosition: state.appReducer.linePosition,
      appTheme: state.appReducer.appTheme,
      windowWidth: state.appReducer.windowWidth,
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
  }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {  // eslint-disable-line no-unused-vars
    return {
    }
}


const LineDumb: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper }>
            <div style={ styles.line.wrapper }>
                <div style={ { ...styles.line.wrapper2, ...styles.line.wrapper2Opened } }>
                    { props.comp }
                </div>
            </div>
        </div>
    )
}

class Line extends React.Component<Props> {
  componentDidMount() {
  }

  render() {
      return (
        <LineDumb
            { ...this.props }
            comp={ this.props.comp }
            linePosition={ this.props.linePosition } >
          </LineDumb>
      )
  }
}

const ConnectedLine: React.ComponentType<OwnProps> =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Line)

export default ConnectedLine
