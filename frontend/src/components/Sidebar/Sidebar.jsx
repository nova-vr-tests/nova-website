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
    goTo: page => dispatch(push(page)),
  }
}

const SidebarSubSection = ({ subSection }) => {
    const subSubSections = subSection.links

    if(subSubSections.length > 0){
        const components = []

        // Loop subsub sections
        for(let i = 0; i < subSubSections.length; i++) {
            const subSubSection = subSubSections[i]
            components[i] = <div className="sub-sub-section--link" key={ i }>{ subSubSection }</div>
        }

        return (
            <div className="sub-section--wrapper">
                <div className="sub-section--title">{ subSection.title }</div>
                <div className="sub-sub-sections--wrapper">
                    { components }
                </div>
            </div>
        )
    } else {
        // Return sub section as link
        return <div className="sub-section--link">{ subSection.title }</div>
    }
}

const SidebarSection = ({ section }) => {
    const subSections = section.links
    const components = []

    const parseSection = section => {
        // Loop subsections
        for(let i = 0; i < subSections.length; i++) {
            const subSection = subSections[i]

            components[i] = <SidebarSubSection subSection={ subSection } key={ i } />
        }

        return components
    }

    return (
        <div className="section--wrapper">
            <div className="section--title">{ section.title }</div>
            <div className="sub-sections--wrapper">
                { parseSection(section) }
            </div>
        </div>
    )
}

const SidebarDumb = props => {
    const parseSections = sections => {
        const components = []

        // Loop sections
        for(let i = 0; i < sections.length; i++) {
            const section = sections[i]

            components[i] = <SidebarSection section={ section } key={ i } />
        }

        return components
    }

    return (
        <div className={ "sidebar--wrapper " + (props.isSiderbarOpened ? "" : " closed ") }>
            <img src={ logo } alt="logo" className="logo" />
            <div className="sections--wrapper">
                { parseSections(props.links) }
            </div>
        </div>
    )
}

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
        const category1 = {
            title: "Nova XR",
            links: [
                {
                    title: "Design",
                    links: [
                        "World",
                        "Interface",
                        "Story",
                    ],
                },
                {
                    title: "Technology",
                    links: [
                        "Virtual Reality",
                        "Augmented Reality",
                        "Related technology",
                    ],
                },
                {
                    title: "Business",
                    links: [
                        "Influence",
                        "Revolution",
                        "Solution",
                    ],
                },
            ],
        }

        const category2 = {
            title: "Resources",
            links: [
                {
                    title: "Lab Live",
                    links: [
                        "Project 1",
                        "Project 2",
                        "Project 3",
                    ],
                },
                {
                    title: "News Insights",
                    links: [
                        "Project 1",
                        "Project 2",
                        "Project 3",
                    ],
                },
                {
                    title: "Educational portal",
                    links: [
                        "Project 1",
                        "Project 2",
                        "Project 3",
                    ],
                },
            ],
        }

        const category3 = {
            title: "Partnership",
            links: [
                {
                    title: "Innovate",
                    links: [
                    ],
                },
                {
                    title: "Improve",
                    links: [
                    ],
                },
                {
                    title: "Strengthen",
                    links: [
                    ],
                },
            ],
        }

        const links = [
            category1,
            category2,
            category3,
        ]

        return <SidebarDumb
            goTo={ this.props.goTo }
            links={ links }
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
