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
        width: 'calc(' + appStyles.lineDimensions.height + ' * 3.5)',
        height: 'min-content',
        fontSize: '2.5vh',
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
    const right = props.align === alignments.right ? 0 : 'inherit'

    return (
        <div style={ { ...styles.pageWrapper, ...{ right } } }>
            { props.children }
        </div>
    )
}

const P = props => {
    const marginLeft = props.align === alignments.right ? '40vw' : ''
    return (
        <p style={ { ...styles.P, ...{ marginLeft } } }>
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
    alignments,
    BigText,
    P,
    PageWrapper,
    H1,
    H2,
}
