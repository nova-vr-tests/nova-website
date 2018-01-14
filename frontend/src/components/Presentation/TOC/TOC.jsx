// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'

import type { Page } from '../PresentationTypes.jsx'

import Hover from '../../HOC/Hover.jsx'

import novaLogo from '../../img/nova-logo.svg'

type Props = {
    pages: Array<Page>,
    currentPage: number,
    goTo: string => void,
    currentPath: string,

}

const HomeTOC = props => {
    let opacity = 0
    if(props.currentPath === '/')
        opacity = 1

    const styles = {
        wrapper:{
            opacity,
            pointerEvents: opacity ? 'inherit' : 'none',
            transition: 'opacity 0.5s linear',
            position: 'absolute',
            width: 'calc(7 * ' + appStyles.unitWidth + ')',
            marginLeft: 'calc(3 * ' + appStyles.unitWidth + ')',
        },
        h1: {
            height: 'calc(4 * ' + appStyles.unitHeight + ')',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
        },
        p: {
            fontSize: '2.5vh',
        },
        logo: {
            position: 'absolute',
            height: 'calc(2 * ' + appStyles.unitHeight + ')',
            marginBottom: 'calc(2 * ' + appStyles.unitHeight + ')',
            marginLeft: 'calc(2 * ' + appStyles.unitWidth + ')',
            bottom: '100%',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontSize: '1rem',
        },
        img: {
            height: '100%',
            marginBottom: '0.5rem',
            filter: 'invert(100%)',
        }
    }


    return (
        <div
            className={ 'HomeTOC--wrapper' }
            style={ styles.wrapper }>
            <div style={ styles.logo }>
                <img
                    style={ styles.img }
                    alt="logo"
                    src={ novaLogo } />
                    <span>XR Media</span>
            </div>
            <h1 style={ styles.h1 }>
                { '<< Dream Awake >>' }
            </h1>
            <p style={ styles.p }>
                We provide XR Media solutions for business. Our work includes sourcing development, production management, and market entry.
            </p>
        </div>
    )
}

HomeTOC.defaultProps = {
}

const TOC: React.StatelessFunctionalComponent<Props> = props => {
    const { clientWidth } = document.documentElement
    let displayWrapper = 'inherit'
    if(clientWidth < appStyles.mediaQueries.phone) {
        displayWrapper = 'none'
    }

    let wrapperOpacity = 1
    if(props.currentPath === '/') {
        wrapperOpacity = 0
    }

    let opacity = 1
    if(props.pages[props.currentPage].mainPanelContent)
        opacity = 0

    const styles = {
        wrapper: {
            display: displayWrapper,
            opacity,
        },
        links: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'calc(3 * ' + appStyles.unitWidth + ')',
            opacity: wrapperOpacity,
            transition: 'opacity 0.5s linear',
        },
        link: {
            height: 'calc(4 / 3 * ' + appStyles.unitHeight + ')',
            width: 'calc( 3 * ' + appStyles.unitWidth + ')',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s linear',
            color: appStyles.themes[props.appTheme].fontColor,
        },
        title: {
            position: 'absolute',
            top: 'calc(6 * ' + appStyles.unitHeight + ')', // from screen top
            left: 'calc(6 * ' + appStyles.unitWidth + ')', // from screen left
            cursor: 'pointer',
            color: appStyles.themes[props.appTheme].fontColor,
            opacity: wrapperOpacity,
            transition: 'opacity 0.5s linear',
        }
    }

    const h2 = props.pages
                       .filter(e => e.h1 === props.pages[props.currentPage].h1 && (e.h2 !== '' && e.h2 !== 'Introduction'))
                       .map(e => e.h2)

    const filteredH2 = h2.reduce((acc, e, i) => i > 0 ? (acc.includes(e) ? acc : [...acc, e]) : [...acc, e], [])
    const paths = props.pages
                       .filter(e => e.h1 === props.pages[props.currentPage].h1 && e.h2 !== '' && e.h2 !== 'Introduction')
                       .map(e => e.path)
    const filteredPaths = paths.reduce((acc, e, i) => i > 0 ? (acc.includes(e) ? acc : [...acc, e]) : [...acc, e], [])

    const sectionIntroPath = props.pages
                                  .filter(e => e.h1 === props.pages[props.currentPage].h1 && (e.h2 === '' || e.h2 === 'Introduction'))
                                  .map(e => e.path)[0]

    const LinkDumb = props => (
        <div
            style={ props.style }
            onClick={ () => props.goTo(props.path) }
            onMouseEnter={ props.onMouseEnter }
            onMouseLeave={ props.onMouseLeave }
            onMouseOver={ props.onMouseOver }
        >
            { props.title }
        </div>
    )

    LinkDumb.defaultProps = {
        title: '',
    }

    const Link = Hover(LinkDumb)

    const currentPath = props.pages[props.currentPage].path

    const Links = filteredH2.map((e, i) => (
        <Link
            key={ i }
            title={ e }
            path={ filteredPaths[i] }
            goTo={ props.goTo }
            currentPath={ currentPath }
            style={{
                ...styles.link,
                ...(e === '' ? { display: 'none' } : {}),
                ...(filteredPaths[i] === currentPath ? { backgroundColor: 'rgba(0, 0, 0, 0.1)' } : {}),
            }}
            hoverStyleDiff={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        />
    ))

    return (
        <div style={ styles.wrapper }>
            <h1 style={ styles.title } onClick={ () => props.goTo(sectionIntroPath) }>{ props.pages[props.currentPage].h1 }</h1>
            <div style={ styles.links }>
                { Links }
            </div>
            <HomeTOC currentPath={ props.currentPath } />
        </div>
    )
}

export default TOC

export {
    HomeTOC,
}
