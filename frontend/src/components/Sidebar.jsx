import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './Sidebar.css';

const reduxStatePropTypes = {
    isSiderbarOpened: PropTypes.bool.isRequired,
}

const mapStateToProps = function(state) {
	return {
        isSiderbarOpened: state.appReducer.isSidebarOpened,
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

const SidebarDumb = props => (
    <div className={ "sidebar--wrapper " + (props.isSiderbarOpened ? "" : " closed ") }>
        <div className="links--wrapper">
            <div className="link">
                about us
            </div>
            <div className="link">
                services
            </div>
            <div className="link">
                case study
            </div>
            <div className="link">
                location
            </div>
            <div className="link">
                login
            </div>
        </div>
  </div>
)

SidebarDumb.propTypes = {
  ...reduxStatePropTypes,
  ...reduxDispatchPropTypes,
}

SidebarDumb.defaultProps = {
}

class Sidebar extends Component {
    componentDidMount() {
    }

    render() {
        return <SidebarDumb
            changePage={ this.props.changePage }
            isSiderbarOpened={ this.props.isSiderbarOpened } />
    }
}

Sidebar.propTypes = {
  ...SidebarDumb.propTypes,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)