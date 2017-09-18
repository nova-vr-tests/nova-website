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
    changePage: () => dispatch(push('/about-us')),
  }
}


const LineDumb = props => {
    console.log(props.linePosition)
    const styles = {
        wrapper: {
            marginTop: 'calc(' + (9 + 2 * props.linePosition) + ' * ' + constants.styles.unitHeight + ')',
            height: 'calc(4 * ' + 100/24 + 'vh)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            width: '100vw',
        },
    }

    return (
        <div style={ styles.wrapper }>
            { props.children }
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
