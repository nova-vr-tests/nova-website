// @flow

import * as React from 'react'
import { connect }from 'react-redux'
import './styles/Sidebar.css'
import {
    initSidebarLinkStates,
    toggleSidebarSection,
    toggleSidebarSubSection,
    toggleSidebar,
} from '../../reducer/actions/Sidebar.js'
import { styles } from '../../constants.js'
import { menuInput } from '../pages/Pages.jsx'
import {
    updateIsFooterOpened,
} from '../../reducer/actions/App.js'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
    State,
    SidebarDumbProps,
    SidebarSectionProps,
    SidebarSubSectionProps,
} from './SidebarTypes.jsx'

import getStyles, {
    getSidebarSectionStyles,
    getSidebarSubSectionStyles,
} from './SidebarStyles.jsx'


import { Link } from 'react-router-dom'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'

const constants = { styles }



const SidebarSubSection: React.StatelessFunctionalComponent<SidebarSubSectionProps> = props => {
    const { subSection } = props
    const _subSubSections = subSection.links
    const subSubSections = _subSubSections.slice(1, _subSubSections.length)
    const _subSubSectionsPaths = subSection.paths
    const subSubSectionsPaths = _subSubSectionsPaths.slice(1, _subSubSectionsPaths.length)

    const styles = getSidebarSubSectionStyles()

    // don't push page if already on location
    const goTo = path => props.goTo(path)

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
                style={ {...styles.subSection.wrapper, ...(props.isOpened ? styles.subSection.opened : {})} }>
                    <Link
                        onClick={ () => goTo() }
                        to={ subSection.paths[0] }
                        className={ !props.isOpened ? "sidebar-subsection--hover " + props.appTheme : "sidebar-subsection--active " + props.appTheme }
                        style={ styles.subSection.title }>
                        { subSection.title }
                    </Link>
                    <div
                        style={ {...styles.subSubSection.wrapper, ...(props.isOpened ? styles.subSubSection.opened: {})} }>
                        { components }
                    </div>
            </div>
        )
    } else {
        // Return sub section as link
        return <Link
            onClick={ () => goTo() }
            to={ subSection.paths[0] }
            className={ "sidebar-subsection--hover " + props.appTheme }
            style={ styles.subSection.link }>
                { subSection.title }
            </Link>
        // return <div
        //            className={ "sidebar-subsection--hover " + props.appTheme }
        //            onClick={ () => goTo(subSection.paths[0]) }
        //            style={ styles.subSection.link }>
        //            { subSection.title }
        //        </div>
    }
}

const SidebarSection: React.StatelessFunctionalComponent<SidebarSectionProps> = props => {
    const { section } = props
    const subSections = section.links
    const components = []

    const styles = getSidebarSectionStyles(props)


    const parseSection = () => {
        // Loop subsections
        for(let i = 0; i < subSections.length; i++) {
            const subSection = subSections[i]

            components[i] = <SidebarSubSection
                                { ...props }
                                isOpened={ props.sectionState.subSections[i] }
                                subSection={ subSection }
                                id={ {section: props.id.section, subSection: i} }
                                key={ i } />
        }

        return components
    }

    // dont do anything on hover for mobile
    const onHover = () => {
        if(props.windowWidth > constants.styles.mediaQueries.phone) {
            return props.toggleSection(props.id.section)
        }
    }

    // dont do anything on click for desktop
    const onClick = () => {
        if(props.windowWidth < constants.styles.mediaQueries.phone) {
            return props.toggleSection(props.id.section)
        }
    }


    return (
        <div
            onMouseEnter={ onHover }
            onMouseLeave={ onHover }
            style={ { ...styles.viewWrapper, ...(props.isOpened ? styles.viewWrapperOpened : {})} }>
            <div style={ { ...styles.section.wrapper, ...(props.isOpened ? styles.section.opened : {})} }>
                <div style={ styles.section.titleWrapper }>
                    <div
                        style={ { ...styles.section.title, ...(props.isOpened ? styles.section.titleActive : {})} }
                        onClick={ onClick }>
                        { section.title }
                    </div>
                </div>
                <div style={ styles.subSections.wrapper }>
                    { parseSection() }
                </div>
            </div>
        </div>
    )
}

const SidebarDumb: React.StatelessFunctionalComponent<SidebarDumbProps> = props => {
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
                                id={ {section: i, subSection: 0} }
                                key={ i } />
        }

        return components
    }


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


    const styles = getStyles(props)

    return (
        <div style={ {
                ...styles.wrapper,
                ...(isSubSectionOpened() ? styles.large : {}),
                ...(props.isSidebarOpened ? styles.opened : {}),
        } }>
            <div style={ styles.sectionsWrapper }>
                { parseSections(props.links) }
                <div style={ styles.bottomLine }>
                </div>
            </div>
            <div style={ styles.borderDiv }>
            </div>
        </div>
    )
}

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
	return {
      isSidebarOpened: state.sidebarReducer.isSidebarOpened,
      linkStates: state.sidebarReducer.linkStates,
      linePosition: state.appReducer.linePosition,
      headerIntersection: state.headerReducer.sidebarIntersection,
      routing: state.routing,
      appTheme: state.appReducer.appTheme,
      windowWidth: state.appReducer.windowWidth,
    }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) {
	return {
    goTo: () => { dispatch(updateIsFooterOpened(false)) },
    initLinkStates: links => dispatch(initSidebarLinkStates(links)),
    toggleSection: i => dispatch(toggleSidebarSection(i)),
    toggleSubSection: (i, j) => dispatch(toggleSidebarSubSection(i, j)),
    toggleSidebar: () => dispatch(toggleSidebar()),
  }
}

class Sidebar extends React.Component<Props, State> {
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

    componentWillUpdate(nextProps) {
        const nextPath = nextProps.routing.location.pathname
        const currentPath = this.props.routing.location.pathname
        const { isSidebarOpened } = this.props
        const isMobile = document.documentElement.clientWidth < styles.mediaQueries.phone

        // if page change and sidebar opened on mobile
        if (nextPath !== currentPath && isSidebarOpened && isMobile) {
            this.props.toggleSidebar()
        }
    }

    render() {
        if(this.props.linkStates.length === 0) {
            return <div></div>
        }


        return <SidebarDumb
            { ...this.props }
            themeStyles={ constants.styles.themes[this.props.appTheme] }
            links={ this.state.links } />
    }
}

Sidebar.propTypes = {
}

const ConnectedSidebar: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar)

export default ConnectedSidebar
