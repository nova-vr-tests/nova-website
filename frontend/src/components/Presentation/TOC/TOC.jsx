// @flow

import { styles as appStyles } from '../../../constants.js'




import * as React from 'react'

const coord2Circ = (x: number): {y1: number, y2: number} => {
    const vh = document.documentElement.clientHeight / 100
    const vw = document.documentElement.clientWidth / 100
    const { radius, centerX, centerY } = appStyles.header
    const { unitWidthJs } = appStyles

    // unit conversions
    const unitWidth = unitWidthJs
    const r = radius * vh
    const Cx = centerX * vw
    const Cy = centerY * vh

    // solve for x = sidebar width
    console.log(Cx, Cy, x)

    // solve for the determinant
    const delta1 = Math.pow(2 * Cy, 2) - 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const delta2 = Math.pow(2 * Cy, 2) + 4 * (x*x - 2*x*Cx + Cx*Cx + Cy*Cy - r*r)
    const y1 = ((2*Cy) + Math.sqrt(delta1)) / 2
    const y2 = ((2*Cy) + Math.sqrt(delta2)) / 2

    return { y1, y2 }
}

const BG = props => {
    const styles = {
        wrapper: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 'calc(6 * ' + appStyles.unitWidth + ')',
            right: 0,
        },
    }

    console.log(coord2Circ(document.documentElement.clientHeight - 6 * appStyles.unitWidthJs))

    const screenRightEdge = 6 * appStyles.unitWidthJs
    const { clientWidth } = document.documentElement
    const p1 = {x: screenRightEdge, y: coord2Circ(clientWidth).y1}
    const p2 = {x: 0, y: coord2Circ(clientWidth - 6 * appStyles.unitWidthJs).y1}
    const p3 = {x: 0, y: 1100}
    const p4 = {x: screenRightEdge, y: 1100}
    const path =
        'M ' + p1.x + ' ' + p1.y + ' '
        + 'L ' + p2.x + ' ' + p2.y + ' '
        + p3.x + ' ' + p3.y + ' '
        + p4.x + ' ' + p4.y


    return (
        <div style={ styles.wrapper }>
            <svg height='100%' style={ { width: styles.wrapper.width } }
                 viewport='0 0 100 100'
                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d={ path }
                      fill="rgba(0, 0, 0, 0.3)" stroke="rgba(0, 0, 0, 0)" strokeWidth="3" />
            </svg>
        </div>
    )
}

type Props = {
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

    return (
        <div style={ styles.wrapper }>
            <BG />
            <h1 style={ styles.title }>TOC</h1>
            <div style={ styles.links }>
                <div style={ styles.link }>
                    Link 1
                </div>
                <div style={ styles.link }>
                    Link 2
                </div>
                <div style={ styles.link }>
                    Link 3
                </div>
            </div>
        </div>
    )
}

export default TOC
