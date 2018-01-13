// @flow

import * as React from 'react'
import { styles as appStyles } from '../../constants.js'
import type { CSSStyleDeclaration } from '../../constantTypes.jsx'

type IAligments = {
    right: string,
    farRight: string,
    center: string,
    left: string,
    farLeft: string,
}

const alignments: IAligments = {
    farRight: 'far-right',
    right: 'right',
    center: 'center',
    left: 'left',
    farLeft: 'far-left',
}

const styles = {
    pageWrapper: {
        display: 'flex',
        flex: 1,
        position: 'relative',
        alignItems: 'center',
    },
    P: {
        width: '100%',
        height: 'min-content',
        fontSize: appStyles.UI.P.fontSize,
    },
    H1: {
        position: 'absolute',
        bottom: '100%',
        margin: 0,
        marginBottom: 'calc(3 * ' + appStyles.unitHeight + ')',
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
        marginBottom: 'calc(0.5 * ' + appStyles.unitHeight + ')',
    },
    BigText: {
        fontSize: '3vh',
    },
}


type UIprops = {
    children: React.Node,
    style?: CSSStyleDeclaration,
}

const BigText = (props: UIprops) => (
    <span style={ styles.BigText }>{ props.children }</span>
)

const PageWrapper = (props: UIprops) => {
    const right = props.align === alignments.right ? 0 : 'inherit'

    return (
        <div style={ { ...styles.pageWrapper, ...{ right } } }>
            { props.children }
        </div>
    )
}

const P = (props: UIprops) => {
    const marginLeft = props.align === alignments.right ? '40vw' : ''
    return (
        <p style={ { ...styles.P, ...{ marginLeft }, ...props.style } }>
            { props.children }
        </p>
    )
}

const FlexColumn = props => {
    const styles = {
        wrapper: {
            ...props.styles.wrapper,
            display: 'flex',
            flexDirection: 'column',
        }
    }

    return (
        <div
            className={ 'FlexColumn--wrapper' }
            style={ styles.wrapper }>
            { props.children }
        </div>
    )
}

FlexColumn.defaultProps = {
    children: React.Node,
    styles: {},
}


const H1  = (props: UIprops)  => {
    return (
        <h1 style={ { ...styles.H1, ...props.style } }>
            { props.children }
        </h1>
    )
}

const H2 = (props: UIprops) => {
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
    FlexColumn,
    PageWrapper,
    H1,
    H2,
}
