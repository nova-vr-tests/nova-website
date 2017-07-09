import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import './Footer.css';

const reduxStatePropTypes = {
}

const mapStateToProps = function(state) {
	return {
  }
}

const reduxDispatchPropTypes = {
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const FooterDumb = props => (
    <div className="footer--wrapper">
        <div className="footer-background init-position">
        </div>
    </div>
)

FooterDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

FooterDumb.defaultProps = {
}

class Footer extends Component {
  componentDidMount() {

  }

  render() {
    return <FooterDumb />
  }
}

Footer.propTypes = {
  ...FooterDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)