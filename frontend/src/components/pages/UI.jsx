// @flow

import React from 'react'
import { styles as appStyles } from '../../constants.js'

type IAligments = {
    right: string,
}
const alignments: IAligments = {
    right: 'right',
}

const styles = {
    pageWrapper: {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'relative',
        alignItems: 'center',
    },
    P: {
        width: '45rem',
        height: 'min-content',
        fontSize: '2.1vh',
    },
    H1: {
        position: 'absolute',
        bottom: '100%',
        margin: 0,
        marginBottom: 'calc(2 * ' + appStyles.unitHeight + ')',
        marginLeft: 'calc(2 * ' + appStyles.unitWidth + ')',
        height: 'calc(2 * ' + appStyles.unitHeight + ')',
        alignItems: 'flex-end',
        display: 'flex',
    },
    H2: {
        position: 'absolute',
        bottom: '100%',
        height: 'calc(2 * ' + appStyles.unitHeight + ')',
        alignItems: 'center',
        display: 'flex',
        margin: 0,
        marginLeft: appStyles.unitWidth,
    },
    BigText: {
        fontSize: '3vh',
    },
}

const BigText = props => (
    <span style={ styles.BigText }>{ props.children }</span>
)

const PageWrapper = props => {
    return (
        <div style={ styles.pageWrapper }>
            { props.children }
        </div>
    )
}

const P = props => {
    return (
        <p style={ styles.P }>
            { props.children }
        </p>
    )
}

const H1  = props => {
    return (
        <h1 style={ { ...styles.H1, ...props.style } }>
            { props.children }
        </h1>
    )
}

const H2 = props => {
    return (
        <h2 style={ { ...styles.H2, ...props.style } }>
            { props.children }
        </h2>
    )
}

export {
    BigText,
    P,
    PageWrapper,
    H1,
    H2,
}
