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

const constants = {
    styles: {
        unitHeight: 100/24 + 'vh',
        unitWidth: '60px',
        sidebar: {
            widthFactor: 3,
            sectionHeightFactor: 2,
            subSectionHeightFactor: 4 / 3,
            transition: {
                length: ' 0.3s ',
                type: ' linear',
            },
        },
    },
}


const SidebarSubSection = props => {
    const { subSection } = props
    const subSubSections = subSection.links

    const unitHeight = constants.styles.unitHeight

    const sidebarWidth =  constants.styles.sidebar.widthFactor + ' * ' + constants.styles.unitWidth

    const styles = {
        subSection:{
            wrapper: {
                display: 'flex',
                flexDirection: 'row',
                minHeight: 'calc(' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
            },
            opened: {
            },
            title: {
                minWidth: 'calc(' + sidebarWidth + ')',
                minHeight: 'calc(' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                flex: 1,
            },
            link: {
                minHeight: 'calc(' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
        },
        subSubSection:{
            wrapper: {
                display: 'flex',
                flexDirection: 'column',
                left: '100%',
                right: '-100%',
                top: 0,
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s linear',
                position: 'absolute',
            },
            opened: {
                opacity: 1,
                pointerEvents: 'inherit',
            },
            link: {
                minHeight: 'calc(' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                width: 'calc(' + sidebarWidth + ')',
            },
        },
    }

    if(subSubSections.length > 0) {
        const components = []

        // Loop subsub sections
        for(let i = 0; i < subSubSections.length; i++) {
            const subSubSection = subSubSections[i]
            components[i] = <div
                                style={ styles.subSubSection.link }
                                key={ i }>
                                { subSubSection }
                            </div>
        }

        return (
            <div style={ {...styles.subSection.wrapper, ...(props.isOpened ? styles.subSection.opened : {})} }>
                    <div
                        style={ styles.subSection.title }
                        onClick={ () => props.dispatch.toggleSidebarSubSection(props.id.section, props.id.subSection) }>
                        { subSection.title }
                    </div>
                    <div style={ {...styles.subSubSection.wrapper, ...(props.isOpened ? styles.subSubSection.opened: {})} }>
                        { components }
                    </div>
            </div>
        )
    } else {
        // Return sub section as link
        return <div style={ styles.subSection.link }>{ subSection.title }</div>
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

    const unitHeight = constants.styles.unitHeight
    const unitWidth = constants.styles.unitWidth

    const styles = {
        viewWrapper: {
            overflow: 'hidden',
            width: 'calc(3 * ' + unitWidth + ')',
            transition: 'width ' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
        },
        viewWrapperOpened: {
            width: 'calc(6 * ' + unitWidth + ')',
        },
        section: {
            wrapper: {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                height: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ' + 3 * ' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
                maxHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                overflow: 'visible',
                transition: 'max-height' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
            },
            title: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                width: 'calc(3 * ' + unitWidth + ')',
                height: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                minHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
            },
            opened: {
                maxHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ' + 3 * ' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
            }
        },
        subSections: {
            wrapper: {
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: 'calc(3 * ' + unitWidth + ')',
            },
        },
    }

    return (
        <div style={ { ...styles.viewWrapper, ...(props.isOpened ? styles.viewWrapperOpened : {})} }>
        <div style={ { ...styles.section.wrapper, ...(props.isOpened ? styles.section.opened : {})} }>
            <div
                style={ styles.section.title }
                onClick={ () => props.dispatch.toggleSidebarSection(props.id.section) }>
                { section.title }
            </div>
            <div style={ styles.subSections.wrapper }>
                { parseSection(section) }
            </div>
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

    const sidebarWidth =  constants.styles.sidebar.widthFactor + ' * ' + constants.styles.unitWidth

    // Returns true if a subsetion is opened and the sidebar needs to be wider to show the subsections
    const isSubSectionOpened = () => {
        const { linkStates } = props

        let i = 0

        for(let j = 0; j < linkStates.length; j++)
            for(let k = 0; k < linkStates[j].subSections.length; k++)
                if(linkStates[j].subSections[k])
                    i++

        return i ? true : false
    }

    const styles = {
        wrapper: {
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100vh',
            display: 'flex',
            flex: 1,
            width: 'calc(' + sidebarWidth + ' * 2)',
            maxWidth: 'calc(' + sidebarWidth + ' + 1px)', // 1px is for borderDiv border
            paddingTop: '10rem',
            transition: 'max-width ' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
            overflow: 'hidden',
        },
        logo: {
            height: '10rem',
            position: 'absolute',
            width: 'calc(' + sidebarWidth + ' ' + '/ 1)',
            top: 0,
        },
        sectionsWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        opened: {
        },
        large: {
            maxWidth: 'calc(' + sidebarWidth + ' * 2)',
        },
        borderDiv: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            minWidth: 'calc(' + sidebarWidth + ')',
            borderRight: '1px solid rgba(255, 255, 255, 0.6)',
            pointerEvents: 'none',
        }
    }

    return (
        <div style={ {
                ...styles.wrapper,
                ...(props.isSiderbarOpened ? styles.opened : {}),
                ...(isSubSectionOpened() ? styles.large : {}),
        } }>
            <img src={ logo } alt="logo" style={ styles.logo } />
            <div>
                { parseSections(props.links) }
            </div>
            <div style={ styles.borderDiv }>
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
