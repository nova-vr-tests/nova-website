// @flow

import * as React from 'react'
import { styles as appStyles } from '../../constants.js'
import type { CSSStyleDeclaration } from '../../constantTypes.jsx'
import { Hover } from '../HOC/HOC.jsx'
import novaLoader from '../img/nova-loader.gif'

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

const Textbox = props => {
    const normalBorderColor = props.borderColor || 'rgba(0, 0, 0, 0.5)'
    const borderColor = props.isError ? 'rgba(255, 0, 0, 0.5)' : normalBorderColor
    const styles = {
        input: {
            borderRight: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            borderTop: `1px solid ${borderColor}`,
            borderLeft: `0px solid ${borderColor}`,
            width: `calc(6 * ${appStyles.unitWidth})`,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            height: '3rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            paddingLeft: '2rem',
            marginLeft: '-2rem',
            ...props.style,
        },
    }
    const type = props.isPassword ? "password" : "textbox"
    return <input
        type={ type }
        placeholder={ props.placeholder }
        style={ styles.input }
        onChange={ e => props.onChange(e.target.value) }
        value={ props.value } />
}

const TextArea = props => {
    const borderColor = props.isError ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)'
    const styles = {
        textarea: {
            borderRight: `1px solid ${borderColor}`,
            borderBottom: `1px solid ${borderColor}`,
            borderTop: `1px solid ${borderColor}`,
            width: `calc(6 * ${appStyles.unitWidth})`,
            borderLeft: 0,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            height: '10rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            padding: '2rem',
            marginLeft: '-2rem',
        }
    }
    return <textarea
        style={ styles.textarea }
        onChange={ e => props.onChange(e.target.value) }
        value={ props.value }></textarea>
}




const Checkbox = props => {
    return <input
        type="checkbox"
        checked={ props.checked }
        style={ props.style }
        onChange={ () => props.onChange(props.id) } />
}

const MultipleChoice = props => {
    const comp = []
    const { choices } = props

    const styles = {
        wrapper: {
            display: 'flex',
        },
        checkbox: {
            marginRight: `calc(0.25 * ${appStyles.unitWidth})`,
        }
    }

    for(let i in choices) {
        const checkbox = (
            <div
              key={ i }
              style={ styles.wrapper }>
              <label style={ styles.label }>
                <Checkbox
                    style={ styles.checkbox }
                    onChange={ () => props.onChange(i) }
                    checked={ props.answer.has(i) } />
                  { choices[i] }
              </label>
            </div>
        )

        comp.push(checkbox)
    }

    return comp
}

const SubmitButton = props => {
    const buttonStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: 'none',
        color: 'white',
        padding: `calc(0.25 * ${appStyles.unitWidth}) calc(1.5 * ${appStyles.unitWidth})`,
        margin: `calc(0.5 * ${appStyles.unitWidth}) calc(0.25 * ${appStyles.unitWidth})`,
        marginLeft: 0,
        cursor: 'pointer',
        borderRadius: '0.5rem',
        transition: 'background-color 0.1s linear, opacity 0.1s linear',
        ...props.style,
    }
    const styles = {
        button: {
            ...buttonStyle,
            opacity: props.isSubmitting ? 0 : 1,
        },
        loader: {
            height: '3rem',
        },
        wrapper: {
            position: 'absolute',
        },
        imageWrapper: {
            ...buttonStyle,
            opacity: props.isSubmitting ? 1 : 0,
            padding: 0,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
        },
        mainWrapper: {
            position: 'relative',
        }
    }

    const Button = props => {
        return <button
            style={ props.style }
            onMouseEnter={ props.onMouseEnter }
            onMouseLeave={ props.onMouseLeave }
            onClick={ props.onClick }>
          Submit
        </button>
    }
    const HoverButton = Hover(Button)

    return (
        <div style={ styles.mainWrapper }>
            <div style={ styles.wrapper }>
                <HoverButton
                    style={ styles.button }
                    onClick={ props.onClick }
                    hoverStyleDiff={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />
                <div style={ styles.imageWrapper }>
                    <img
                        style={ styles.loader }
                        src={ novaLoader } />
                </div>
            </div>
        </div>
    )
}


export {
    alignments,
    BigText,
    FlexColumn,
    H1,
    H2,
    P,
    PageWrapper,
    Textbox,
    TextArea,
    MultipleChoice,
    Checkbox,
    SubmitButton,
}
