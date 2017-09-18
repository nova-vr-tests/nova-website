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


const HomeDumb = props => {
    console.log(props.linePosition)
    const styles = {
        wrapper: {
            marginTop: 'calc(' + (9 + 2 * props.linePosition) * 100/24 + 'vh)',
            height: 'calc(4 * ' + 100/24 + 'vh)',
            backgroundColor: 'white',
            display: 'flex',
            width: '100vh',
        },
    }

    return (
        <div style={ styles.wrapper }>
        </div>
    )
}

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
        linePosition={ this.props.linePosition }
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
