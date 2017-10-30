// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'

import type { Page } from '../PresentationTypes.jsx'

type Props = {
    pages: Array<Page>,
    currentPage: number,
    goTo: string => void,
}

const TOC: React.StatelessFunctionalComponent<Props> = props => {
    const styles = {
        wrapper: {
        },
        links: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'calc(3 * ' + appStyles.unitWidth + ')',
        },
        link: {
            height: 'calc(4 / 3 * ' + appStyles.unitHeight + ')',
            width: 'calc( 3 * ' + appStyles.unitWidth + ')',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            position: 'absolute',
            top: 'calc(6 * ' + appStyles.unitHeight + ')', // from screen top
            left: 'calc(6 * ' + appStyles.unitWidth + ')', // from screen left
        }
    }

    const h2 = props.pages
                       .filter(e => e.h1 === props.pages[props.currentPage].h1 && e.h2 !== '')
                       .map(e => e.h2)
    const filteredH2 = h2.reduce((acc, e, i) => i > 0 ? (acc.includes(e) ? acc : [...acc, e]) : [...acc, e], [])
    const paths = props.pages
                       .filter(e => e.h1 === props.pages[props.currentPage].h1 && e.h2 !== '')
                       .map(e => e.path)
    const filteredPaths = paths.reduce((acc, e, i) => i > 0 ? (acc.includes(e) ? acc : [...acc, e]) : [...acc, e], [])

    return (
        <div style={ styles.wrapper }>
            <h1 style={ styles.title }>TOC</h1>
            <div style={ styles.links }>
                <div style={ styles.link } onClick={ () => props.goTo(filteredPaths[0]) }>
                    { filteredH2[0] }
                </div>
                <div style={ styles.link } onClick={ () => props.goTo(filteredPaths[1]) }>
                    { filteredH2[1] }
                </div>
                <div style={ styles.link } onClick={ () => props.goTo(filteredPaths[2]) }>
                    { filteredH2[2] }
                </div>
            </div>
        </div>
    )
}

export default TOC
