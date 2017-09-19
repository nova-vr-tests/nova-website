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
import { styles } from '../../constants.js'
import Pages from '../pages/pages.js'

const constants = { styles }



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
                flex: 1,
                transition: 'background-color ' + constants.styles.sidebar.hoverTransition.length + constants.styles.sidebar.hoverTransition.type,
            },
            link: {
                minHeight: 'calc(' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background-color ' + constants.styles.sidebar.hoverTransition.length + constants.styles.sidebar.hoverTransition.type,
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
                width: 'calc(' + sidebarWidth + ')',
                transition: 'background-color ' + constants.styles.sidebar.hoverTransition.length + constants.styles.sidebar.hoverTransition.type,
            },
        },
    }


    if(subSubSections.length > 0) {
        const components = []

        // Loop subsub sections
        for(let i = 0; i < subSubSections.length; i++) {
            const subSubSection = subSubSections[i]
            components[i] = <div
                                className="sidebar-subsection--hover"
                                onClick={ () => props.dispatch.goTo(Pages[props.id.section][props.id.subSection][i][1]) }
                                style={ styles.subSubSection.link }
                                key={ i }>
                                { subSubSection }
                            </div>
        }


        return (
            <div
                onMouseEnter={ () => props.dispatch.toggleSidebarSubSection(props.id.section, props.id.subSection) }
                onMouseLeave={ () => props.dispatch.toggleSidebarSubSection(props.id.section, props.id.subSection) }
                style={ {...styles.subSection.wrapper, ...(props.isOpened ? styles.subSection.opened : {})} }>
                    <div
                        style={ styles.subSection.title }
                        className={ !props.isOpened ? "sidebar-subsection--hover" : "sidebar-subsection--active" }
                        onClick={ () => props.dispatch.toggleSidebarSubSection(props.id.section, props.id.subSection) }>
                        { subSection.title }
                    </div>
                    <div
                        style={ {...styles.subSubSection.wrapper, ...(props.isOpened ? styles.subSubSection.opened: {})} }>
                        { components }
                    </div>
            </div>
        )
    } else {
        // Return sub section as link
        return <div
                   className="sidebar-subsection--hover"
                   onClick={ () => props.dispatch.goTo(Pages[props.id.section][props.id.subSection][1]) }
                   style={ styles.subSection.link }>
                   { subSection.title }
               </div>
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
                                linkStates={ props.linkStates }
                                linePosition={ props.linePosition }
                                isOpened={ props.sectionState.subSections[i] }
                                subSection={ subSection }
                                dispatch={ props.dispatch }
                                key={ i }
                                id={ {section: props.id.section, subSection: i} } />
        }

        return components
    }

    const getSectionPosition = (linkStates, linePosition, section) => {
        let marginTop = '-'
        let m0 = marginTop


        // if section is above line position
        if(section < linePosition && linePosition <= 2) {
            if(section === 0) {
                // line height menu is opened ? => subtract section height from top margin
                if(linkStates[linePosition].isOpened)
                    marginTop = marginTop + constants.styles.sidebar.sectionHeightFactor + ' * ' + constants.styles.unitHeight

                if(linkStates[section].isOpened)
                    marginTop =
                        marginTop
                        +
                        3 * constants.styles.sidebar.subSectionHeightFactor + ' * ' + constants.styles.unitHeight
            }

            // is there section after between current section and line ?
            // is this section opened ?
            if(section === 0 && linePosition === 2) {
                console.log(linkStates[1].isOpened)
                if(linkStates[1].isOpened) {
                    marginTop = (marginTop === m0 ? '' : ' - ' + marginTop)
                    marginTop =
                        -3 * constants.styles.sidebar.subSectionHeightFactor + ' * ' + constants.styles.unitHeight
                        +
                        marginTop
                }
            }


            // return 'calc(' + marginTop + ')'
        } else if (section == linePosition) {
            // line height menu is opened ? => subtract section height from top margin
            if(linkStates[linePosition].isOpened && section === 0) {
                marginTop = marginTop + constants.styles.sidebar.sectionHeightFactor + ' * ' + constants.styles.unitHeight
                // return 'calc(' + marginTop + ')'
            }

        }


        if(marginTop !== '-')
            return 'calc(' + marginTop + ')'
        else
            return 0
    }

    const unitHeight = constants.styles.unitHeight
    const unitWidth = constants.styles.unitWidth


    const styles = {
        viewWrapper: {
            overflow: 'hidden',
            width: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
            transition: 'width, margin-top ' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
            marginTop: getSectionPosition(props.linkStates, props.linePosition, props.id.section),
        },
        viewWrapperOpened: {
            width: 'calc(2 * ' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
            //marginTop: '-2rem',
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
                minHeight: 'calc('
                      + (props.linePosition === props.id.section ? '2 * ' : '') +
                      + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight
                      + ')',
            },
            title: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
                height: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                minHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                transition: 'background-color ' + constants.styles.sidebar.hoverTransition.length + constants.styles.sidebar.hoverTransition.type,
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            },
            titleActive: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
            opened: {
                maxHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ' + 3 * ' + constants.styles.sidebar.subSectionHeightFactor + ' * ' + unitHeight + ')',
            }
        },
        subSections: {
            wrapper: {
                transition: 'opacity' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
                opacity: (props.linePosition === props.id.section && !props.isOpened ? 0 : 1),
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
            },
        },
    }

    return (
        <div
            onMouseEnter={ () => props.dispatch.toggleSidebarSection(props.id.section) }
            onMouseLeave={ () => props.dispatch.toggleSidebarSection(props.id.section) }
            style={ { ...styles.viewWrapper, ...(props.isOpened ? styles.viewWrapperOpened : {})} }>
            <div style={ { ...styles.section.wrapper, ...(props.isOpened ? styles.section.opened : {})} }>
                <div
                    style={ { ...styles.section.title, ...(props.isOpened ? styles.section.titleActive : {})} }
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
                                linkStates={ props.linkStates }
                                linePosition={ props.linePosition }
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
            width: 'calc(' + sidebarWidth + ' * 2)', // * 2 b/c of space needed for sub sub sections to appear on the side of sub sections (see SidebarSection styles.opened)
            maxWidth: 'calc(' + sidebarWidth + ' + 1px)', // 1px is for borderDiv border
            transition: 'max-width ' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
            overflow: 'hidden',
        },
        logo: {
            height: '10rem',
            position: 'absolute',
            width: 'calc(' + sidebarWidth + ')',
            top: 0,
        },
        sectionsWrapper: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'calc(' + (9 + 0 * props.linePosition) * 100/24 + 'vh)',
        },
        opened: {
        },
        large: {
            maxWidth: 'calc(' + sidebarWidth + ' * 2)', // see wrapper width
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
            <div style={ styles.sectionsWrapper }>
                { parseSections(props.links) }
                <div style={ { borderBottom: '1px solid rgba(255, 255, 255, 0.3)', maxWidth: 'calc(' + sidebarWidth + ')'} }>
                </div>
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
      linePosition: state.appReducer.linePosition,
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
            goTo: this.props.goTo,
        }

        if(this.props.linkStates.length === 0)
            return <div></div>


        return <SidebarDumb
            linePosition={ this.props.linePosition }
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
