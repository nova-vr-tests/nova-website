// @flow

import { styles as appStyles } from '../../../constants.js'

import * as React from 'react'


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
