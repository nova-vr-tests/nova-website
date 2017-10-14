import React, { Component } from 'react'
import { connect }from 'react-redux'
import { push } from 'react-router-redux'
import './styles/Sidebar.css'
import {
    initSidebarLinkStates,
    toggleSidebarSection,
    toggleSidebarSubSection
} from '../../reducer/actions/Sidebar.js'
import { styles } from '../../constants.js'
import { menuInput } from '../pages/Pages.jsx'
import {
    updateIsFooterOpened,
} from '../../reducer/actions/App.js'
const constants = { styles }


const SidebarSubSection = props => {
    const { subSection } = props
    const _subSubSections = subSection.links
    const subSubSections = _subSubSections.slice(1, _subSubSections.length)
    const _subSubSectionsPaths = subSection.paths
    const subSubSectionsPaths = _subSubSectionsPaths.slice(1, _subSubSectionsPaths.length)


    const unitHeight = constants.styles.unitHeight
    const sidebarWidth =  constants.styles.sidebar.widthFactor + ' * ' + constants.styles.unitWidth

    const styles = {
        subSection:{
            wrapper: {
                cursor: 'pointer',
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
                cursor: 'pointer',
            },
        },
        subSubSection:{
            wrapper: {
                cursor: 'pointer',
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

    // don't push page if already on location
    const goTo = path => props.dispatch.goTo(path)

    if(subSubSections.length > 0) {
        const components = []

        // Loop subsub sections
        for(let i = 0; i < subSubSections.length; i++) {
            const subSubSection = subSubSections[i]
            components[i] = <div
                                className={ "sidebar-subsection--hover " + props.appTheme }
                                onClick={ () => goTo(subSubSectionsPaths[i]) }
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
                        className={ !props.isOpened ? "sidebar-subsection--hover " + props.appTheme : "sidebar-subsection--active " + props.appTheme }
                        onClick={ () => goTo(subSection.paths[0]) }>
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
                   className={ "sidebar-subsection--hover " + props.appTheme }
                   onClick={ () => goTo(subSection.paths[0]) }
                   style={ styles.subSection.link }>
                   { subSection.title }
               </div>
    }
}

const SidebarSection = props => {
    const { section } = props
    const subSections = section.links
    const components = []


    const parseSection = () => {
        // Loop subsections
        for(let i = 0; i < subSections.length; i++) {
            const subSection = subSections[i]

            components[i] = <SidebarSubSection
                                { ...props }
                                isOpened={ props.sectionState.subSections[i] }
                                subSection={ subSection }
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
                if(linkStates[linePosition].isOpened) {
                    marginTop = marginTop + constants.styles.sidebar.sectionHeightFactor + ' * ' + constants.styles.unitHeight
                }

                if(linkStates[section].isOpened) {
                    marginTop =
                        marginTop
                        +
                        3 * constants.styles.sidebar.subSectionHeightFactor + ' * ' + constants.styles.unitHeight
                }
            }

            // is there section after between current section and line ?
            // is this section opened ?
            if(section === 0 && linePosition === 2) {
                if(linkStates[1].isOpened) {
                    marginTop = (marginTop === m0 ? '' : ' - ' + marginTop)
                    marginTop =
                        -3 * constants.styles.sidebar.subSectionHeightFactor + ' * ' + constants.styles.unitHeight
                        +
                        marginTop
                }
            }


            // return 'calc(' + marginTop + ')'
        } else if (section === linePosition) {
            // line height menu is opened ? => subtract section height from top margin
            if(linkStates[linePosition].isOpened && section === 0) {
                marginTop = marginTop + constants.styles.sidebar.sectionHeightFactor + ' * ' + constants.styles.unitHeight
                // return 'calc(' + marginTop + ')'
            }

        }

        if(marginTop !== '-') {
            return 'calc(' + marginTop + ')'
        } else {
            return 0
        }
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
            titleWrapper: {
                transition: 'border ' + constants.styles.slideTransitionTime / 1000 + 's ' + constants.styles.slideTransitionFunc,
                borderTop: props.themeStyles.menuBorder,
                display: 'flex',
                width: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
                minHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
            },
            title: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'calc(' + constants.styles.sidebar.widthFactor + ' * ' + unitWidth + ')',
                height: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                minHeight: 'calc(' + constants.styles.sidebar.sectionHeightFactor + ' * ' + unitHeight + ')',
                transition: 'background-color ' + constants.styles.sidebar.hoverTransition.length + constants.styles.sidebar.hoverTransition.type,
            },
            titleActive: {
                backgroundColor: props.themeStyles.menuTitleActive,
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
                <div style={ styles.section.titleWrapper }>
                    <div
                        style={ { ...styles.section.title, ...(props.isOpened ? styles.section.titleActive : {})} }
                        onClick={ () => props.dispatch.toggleSidebarSection(props.id.section) }>
                        { section.title }
                    </div>
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
                                { ...props }
                                sectionState={ props.linkStates[i] }
                                isOpened={ props.linkStates[i].isOpened }
                                section={ section }
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

        for(let j = 0; j < linkStates.length; j++) {
            for(let k = 0; k < linkStates[j].subSections.length; k++) {
                if(linkStates[j].subSections[k]) {
                    i++
                }
            }
        }


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
            transition: 'all ' + constants.styles.sidebar.transition.length + ' ' + constants.styles.sidebar.transition.type,
            overflow: 'hidden',
            transform: 'translateX(calc(-' + sidebarWidth + '))',
            opacity: 0,
            color: props.themeStyles.menuFontColor,
            zIndex: 1,
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
            transform: 'translateX(0)',
            opacity: 1,
        },
        large: {
            maxWidth: 'calc(' + sidebarWidth + ' * 2)', // see wrapper width
        },
        borderDiv: {
            position: 'absolute',
            top: props.headerIntersection + 'px',
            left: 0,
            height: '100vh',
            minWidth: 'calc(' + sidebarWidth + ')',
            borderRight: props.themeStyles.fatMenuBorder,
            pointerEvents: 'none',
            transition: 'border ' + constants.styles.slideTransitionTime / 1000 + 's ' + constants.styles.slideTransitionFunc,
        }
    }

    const borderTransition = 'border ' + constants.styles.slideTransitionTime / 1000 + 's ' + constants.styles.slideTransitionFunc

    return (
        <div style={ {
                ...styles.wrapper,
                ...(isSubSectionOpened() ? styles.large : {}),
                ...(props.isSidebarOpened ? styles.opened : {}),
        } }>
            <div style={ styles.sectionsWrapper }>
                { parseSections(props.links) }
                <div style={ {
                        borderBottom: props.themeStyles.menuBorder,
                        maxWidth: 'calc(' + sidebarWidth + ')',
                        transition: borderTransition
                } }>
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
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
      linkStates: state.sidebarReducer.linkStates,
      linePosition: state.appReducer.linePosition,
      headerIntersection: state.headerReducer.sidebarIntersection,
      routing: state.routing,
      appTheme: state.appReducer.appTheme,
    }
}

const sidebarDispatch = function(dispatch) {
	return {
    goTo: page => { dispatch(push(page)); dispatch(updateIsFooterOpened(false)) },
    initLinkStates: links => dispatch(initSidebarLinkStates(links)),
    toggleSection: i => dispatch(toggleSidebarSection(i)),
    toggleSubSection: (i, j) => dispatch(toggleSidebarSubSection(i, j)),
  }
}

class Sidebar extends Component {
    constructor(props) {
        super(props)


        const links = menuInput // menuLinks

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

        if(this.props.linkStates.length === 0) {
            return <div></div>
        }


        return <SidebarDumb
            { ...this.props }
            themeStyles={ constants.styles.themes[this.props.appTheme] }
            dispatch={ dispatch }
            links={ this.state.links } />
    }
}

Sidebar.propTypes = {
  ...SidebarDumb.propTypes,
}

export default connect(
    sidebarState,
    sidebarDispatch
)(Sidebar)
