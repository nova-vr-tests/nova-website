import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import logo from '../logo.png';
import './Home.css';

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
    changePage: () => dispatch(push('/about-us')),
  }
}

const HomeDumb = props => (
  <div className="home--wrapper">
    <img
      src={ logo }
      alt="logo"
      className="logo"
      onClick={ props.changePage } />
    <div className="footer-background init-position">
    </div>
  </div>
)

HomeDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,

  footerBgPos: 0,
  logoPos: 0,
}

class Home extends Component {
  componentDidMount() {

  }

  render() {
    return <HomeDumb
      changePage={ this.props.changePage } />
  }
}

Home.propTypes = {
  ...HomeDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)