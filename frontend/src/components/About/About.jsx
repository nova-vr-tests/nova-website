import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './styles/About.css';

const reduxStatePropTypes = {
}

const mapStateToProps = function(state) {
	return {
  }
}

const reduxDispatchPropTypes = {
  changePage: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
    changePage: () => dispatch(push('/')),
  }
}

const AboutDumb = props => (
  <div className="about--wrapper">
    <h1>About Us</h1>
    <p onClick={ props.changePage }>Go back</p>
  </div>
)

AboutDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

AboutDumb.defaultProps = {
}

class About extends Component {
  componentDidMount() {

  }

  render() {
    return <AboutDumb
      changePage={ this.props.changePage } />
  }
}

About.propTypes = {
  ...AboutDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About)
