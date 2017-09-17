import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect }from 'react-redux';
import { push } from 'react-router-redux';
import './styles/Sidebar.css';
import logo from '../img/intro-logo/frame1.svg';
import {
    initSidebarLinkStates,
    toggleSidebarSection,
    toggleSidebarSubSection
} from '../../reducer/actions/Sidebar.js'


const SidebarSubSection = props => {
    const { subSection } = props
    const subSubSections = subSection.links

    if(subSubSections.length > 0) {
        const components = []

        // Loop subsub sections
        for(let i = 0; i < subSubSections.length; i++) {
            const subSubSection = subSubSections[i]
            components[i] = <div
                                className="sub-sub-section--link"
                                key={ i }>
                                { subSubSection }
                            </div>
        }

        return (
            <div className={ "sub-section--wrapper" + (props.isOpened ? " opened" : "") }>
                <div
                    className="sub-section--title"
                    onClick={ () => props.dispatch.toggleSidebarSubSection(props.id.section, props.id.subSection) }>
                    { subSection.title }
                </div>
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

const SidebarSection = props => {
    const { section } = props
    const subSections = section.links
    const components = []

    const parseSection = section => {
        // Loop subsections
        for(let i = 0; i < subSections.length; i++) {
            const subSection = subSections[i]

            components[i] = <SidebarSubSection
                                isOpened={ props.sectionState.subSections[i] }
                                subSection={ subSection }
                                dispatch={ props.dispatch }
                                key={ i }
                                id={ {section: props.id.section, subSection: i} } />
        }

        return components
    }

    return (
        <div className={ "section--wrapper" + (props.isOpened ? " opened" : "") }>
            <div
                className="section--title"
                onClick={ () => props.dispatch.toggleSidebarSection(props.id.section) }>
                { section.title }
            </div>
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

            components[i] = <SidebarSection
                                sectionState={ props.linkStates[i] }
                                isOpened={ props.linkStates[i].isOpened }
                                section={ section }
                                dispatch={ props.dispatch }
                                id={ {section: i} }
                                key={ i } />
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
}

SidebarDumb.defaultProps = {
}

const sidebarState = function(state) {
	return {
      isSiderbarOpened: state.sidebarReducer.isSidebarOpened,
      linkStates: state.sidebarReducer.linkStates,
    }
}

const sidebarDispatch = function(dispatch) {
	return {
    goTo: page => dispatch(push(page)),
    initLinkStates: links => dispatch(initSidebarLinkStates(links)),
    toggleSection: i => dispatch(toggleSidebarSection(i)),
    toggleSubSection: (i, j) => dispatch(toggleSidebarSubSection(i, j)),
  }
}

class Sidebar extends Component {
    constructor(props) {
        super(props)

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
                        "VR",
                        "AR",
                        "Related techs",
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

        this.state = {
            links,
        }
    }

    componentWillMount() {
        this.props.initLinkStates(this.state.links)
    }

    render() {
        const dispatch = {
            toggleSidebarSection: this.props.toggleSection,
            toggleSidebarSubSection: this.props.toggleSubSection,
        }

        if(this.props.linkStates.length === 0)
            return <div></div>


        return <SidebarDumb
            dispatch={ dispatch }
            linkStates={ this.props.linkStates }
            goTo={ this.props.goTo }
            links={ this.state.links }
            isSiderbarOpened={ this.props.isSiderbarOpened } />
    }
}

Sidebar.propTypes = {
  ...SidebarDumb.propTypes,
}

export default connect(
    sidebarState,
    sidebarDispatch,
)(Sidebar)
