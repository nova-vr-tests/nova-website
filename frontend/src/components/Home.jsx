import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './Home.css';

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
    changePage: () => dispatch(push('/about-us')),
  }
}

const HomeDumb = props => (
  <div className="home--wrapper">
    <h1>Coming Soon</h1>
  </div>
)

HomeDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,

  footerBgPos: PropTypes.number,
  logoPos: PropTypes.number,
}

HomeDumb.defaultProps = {
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