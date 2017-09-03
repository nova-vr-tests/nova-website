import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './styles/Home.css';
import decoration from '../img/home/decoration1.jpg';

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
    <div className="text--wrapper">
      <h1>New Year's Eve in VR</h1>
      <h2>Anywhere Anytime</h2>
      <div className="text--content">
        <p>
          Live from around the world, in stereoscopic 3D virtual reality,
          we will bring you to 10 of the most iconic locations on Earth to
          celebrate with locals.
        </p>
        <p>
          All you need is the internet.
        </p>
        <p>
          Imagine jumping from one city to another with the click of your controller. This New Year's Eve you can travel the globe without ever leaving your living room. Teleport, fly, or transform into a mega-robot with friends and strangers alike.
        </p>
        <p>
          This year will be like none other !
        </p>
      </div>
    </div>
    <div className="image--wrapper">
      <img src={ decoration } className="supporting-image" alt="decoration" />
    </div>
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
