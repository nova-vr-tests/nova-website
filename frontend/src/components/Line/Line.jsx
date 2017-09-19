import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import { styles } from '../../constants.js'

const constants = { styles }

const reduxStatePropTypes = {
}

const mapStateToProps = function(state) {
	return {
      linePosition: state.appReducer.linePosition,
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}


const LineDumb = props => {
    const styles = {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: 'calc(' + (9 + 2 * props.linePosition) + ' * ' + constants.styles.unitHeight + ')',
            transition: 'margin-top 0.3s linear'
        },
        line: {
            wrapper: {
                minHeight: 'calc(2 * ' + 100/24 + 'vh)',
                display: 'flex',
                width: '100vw',
            },
            wrapper2: {
                height: 0,
                display: 'flex',
                flex: 1,
                paddingLeft: '25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                opacity: 0,
                transition: 'opacity ' + constants.styles.sidebar.transition.length + constants.styles.sidebar.transition.type,
            },
            wrapper2Opened: {
                height: 'calc(4 * ' + 100/24 + 'vh)',
                opacity: 1,
            },
        },
    }

    return (
        <div style={ styles.wrapper }>
            <div style={ styles.line.wrapper }>
                <div style={ { ...styles.line.wrapper2, ...styles.line.wrapper2Opened } }>
                    { props.lines[0] }
                    { props.lines[1] }
                    { props.lines[2] }
                </div>
            </div>
        </div>
    )
}

LineDumb.propTypes = {
}

LineDumb.defaultProps = {
}

class Line extends Component {
  componentDidMount() {

  }

  render() {
      return (
        <LineDumb
            lines={ this.props.lines }
            linePosition={ this.props.linePosition } >
          { this.props.children }
          </LineDumb>
      )
  }
}

Line.propTypes = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Line)
