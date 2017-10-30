// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'

import type { Page } from '../PresentationTypes.jsx'

const coord2Circ = (x: number): {y1: number, y2: number} => {
    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const { radius, centerX, centerY } = appStyles.header

    // unit conversions
    const r = radius * vh
    const Cx = centerX * vw
    const Cy = centerY * vh

    // solve for x = sidebar width

    // solve for the determinant
    const delta1 = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const delta2 = Math.pow(2 * Cy, 2) + 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const y1 = ((2*Cy) + Math.sqrt(delta1)) / 2
    const y2 = ((2*Cy) + Math.sqrt(delta2)) / 2

    return { y1, y2 }
}

const BG = props => {
    const widthCoef = props.widthCoef
    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'

    const styles = {
        wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: panelWidth,
            right: 0,
        },
        svg: {
            width: panelWidth,
        },
    }

    const { header } = appStyles

    // unit conversions
    const vh = document.documentElement.clientHeight / 100
    const r = header.radius * vh

    const screenRightEdge = widthCoef * appStyles.unitWidthJs
    const { clientWidth, clientHeight } = document.documentElement
    const p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
    const p2 = {x: 0, y: coord2Circ(clientWidth - widthCoef * appStyles.unitWidthJs).y1}
    const p3 = {x: 0, y: clientHeight - p2.y}
    const p4 = {x: screenRightEdge, y: clientHeight - p1.y}
    const path =
        'M ' + p1.x + ' ' + p1.y
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p2.x + ' ' + p2.y
        + ' L ' + p3.x + ' ' + p3.y + ' '
        + ' A ' + r + ' ' + r + ' 0 0 1 ' + p4.x + ' ' + p4.y


    return (
        <div style={ styles.wrapper }>
            <svg height='100%' style={ styles.svg }
                 viewport='0 0 100 100'
                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d={ path }
                      fill="rgba(0, 0, 0, 0.6)" stroke="rgba(0, 0, 0, 0)" strokeWidth="3" />
            </svg>
        </div>
    )
}

type Props = {
    isOpened: boolean,
    comp: React.Node,
    currentPage: number,
    pages: Array<Page>,
}

const SidePanel: React.StatelessFunctionalComponent<Props> = props => {
    const widthCoef = 11
    const panelWidth = 'calc(' + widthCoef + ' * ' + appStyles.unitWidth + ')'
    const headerHeightCoef = 3
    const footerHeightCoef = headerHeightCoef
    const lineHeightCoef = 4 // height of vertical line spanning across screen
    const lineYCoef = 9 // distance from top of screen to top of line
    const titleHeightCoef = 2
    const headHeightCoef = lineYCoef - headerHeightCoef - titleHeightCoef
    const tailHeightCoef = 24 - lineYCoef - footerHeightCoef - lineHeightCoef

    const styles = {
        wrapper: {
        },
        isOpened: {
        },
        contentWrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 'calc(100vw - ' + panelWidth + ')',
            padding: 'calc(' + headerHeightCoef + ' * ' + appStyles.unitHeight + ') ' + appStyles.unitWidth,
        },
        slideParagraphs: {
            //height: '70vh',
            height: 'calc(' + (24 - headerHeightCoef - titleHeightCoef - footerHeightCoef) + ' * ' + appStyles.unitHeight + ')',
            overflowY: 'scroll',
        },
        head: {
            height: 'calc(' + headHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        tail: {
            height: 'calc(' + tailHeightCoef + ' * ' + appStyles.unitHeight + ') ',
        },
        title: {
            height: 'calc(2 * ' + appStyles.unitHeight + ') ',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            margin: 0,
        },
    }

    const { pid } = props.pages[props.currentPage]
    const presSlides = props.pages.filter(e => e.pid === pid)
    const content = presSlides.map(e => e.comp).map((Comp, i) => <Comp key={ i } />)

    return (
        <div style={ styles.wrapper }>
            <BG
                widthCoef={ widthCoef }
            />
            <div style={ styles.contentWrapper }>
                <h2 style={ styles.title }>{ props.pages[props.currentPage].h2 }</h2>
                <div style={ styles.slideParagraphs }>
                    <div>
                        <div style={ styles.head }>
                        </div>
                        { content }
                        <div style={ styles.tail }>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePanel
