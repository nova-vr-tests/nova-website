import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './styles/Sidebar.css';
import logo from '../img/intro-logo/frame1.svg';

class LinksDrawer extends Component {
    constructor(props) {
        super()

        this.state = {
            isOpened: false,
        }

        this.getLinks = this.getLinks.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }

    componentDidMount() {
    }

    getLinks() {
        return this.props.links.map((link, i) => <div className="link" key={ i }>{ link }</div>)
    }

    toggleDrawer() {
        this.setState({ isOpened: !this.state.isOpened })
    }

    render() {
        return (
            <div className={ "link-drawer--wrapper" + (this.state.isOpened ? " opened" : "")}>
                <div className="header" onClick={ this.toggleDrawer }>
                    { this.props.header }
                </div>
                <div className={ "links--wrapper" + (this.state.isOpened ? " opened" : "") }>
                    { this.getLinks() }
                </div>
            </div>
        )
    }
}

LinksDrawer.propTypes = {
    header: PropTypes.string,
    links: PropTypes.array,
}

LinksDrawer.defaultProps = {
    header: "test",
    links: ["foo", "bar"],
}


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
        <img src={ logo } alt="logo" className="logo" />
        <div className="links--wrapper">
            <LinksDrawer
                links={ ["What is Nova ?", "The team"] }
                header="about us"/>
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
