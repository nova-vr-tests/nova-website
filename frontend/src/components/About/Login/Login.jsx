import React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    withState,
    lifecycle,
} from 'recompose'

import getStyles, {
} from './LoginStyles.jsx'


import {
    Form,
    Text,
    Radio,
    RadioGroup,
    Select,
    Checkbox,
    TextArea,
    Password,
} from 'react-form'

const mapStateToProps = state => ({
    windowWidth: state.appReducer.windowWidth,
})

const mapDispatchToProps = dispatch => ({
})

const Loading = props => {
    const styles = {
        wrapper:{
            pointerEvents: 'none',
            opacity: props.show ? 1 : 0,
            transition: 'opacity 0.2s linear',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        circle: {
            height: '4rem',
            width: '4rem',
            border: '5px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            animation: 'rotate 1s linear',
            animationIterationCount: 'infinite',
            borderLeftColor: 'rgba(0, 0, 0, 0)'
        }
    }

    return (
        <div
            className={ 'Loading--wrapper' }
            style={ styles.wrapper }>
            <div style={ styles.circle }>
            </div>
        </div>
    )
}

Loading.defaultProps = {
    show: false,
}

const LoginForm = props => {
    const borderColor = 'rgba(0, 0, 0, 0.2)'

    const styles = {
        wrapper:{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            margin: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '1px solid ' + borderColor,
            borderRadius: '1rem',
            padding: '0 2rem',
            height: '2rem',
            transition: 'border-color 0.2s linear',
        },
        button: {
            margin: '1rem',
            height: '2rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'rgba(255, 255, 255, 0.8)',
            border: '0px solid ' + borderColor,
            borderRadius: '1rem',
            padding: '0 2rem',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            borderColor: 'red',
        }
    }

    return (
        <div
            className={ 'LoginForm--wrapper' }
            style={ styles.wrapper }>

            <form
                style={ styles.wrapper }
                onSubmit={props.formApi.submitForm}
                id="form2">

                <Loading show={ props.isLoading } />

                <Text
                    style={ {
                        ...styles.input,
                        ...(props.isError ? styles.error : {})
                    } }
                    placeholder="Username"
                    field="username"
                    id="username" />
                <Text
                    style={ {
                        ...styles.input,
                        ...(props.isError ? styles.error : {})
                    } }
                    type="password"
                    placeholder="Password"
                    field="password"
                    id="password" />
                <button
                    type="submit"
                    style={ styles.button }>
                    Login
                </button>
            </form>

        </div>
    )
}

LoginForm.defaultProps = {
    isError: false,
    isLoading: false,
    formApi: {},
}


const Login = props => {
    const styles = getStyles(props)

    const submit = () => {
        props.setIsError(false)
        props.setIsLoading(true)

        window.setTimeout(() => {
            props.setIsError(true)
            props.setIsLoading(false)
        }, 1000)
    }

    return (
        <div style={ styles.wrapper }>
            <Form
                onSubmit={ submit }>
                { formApi => <LoginForm
                    formApi={ formApi }
                    isError={ props.isError }
                    isLoading={ props.isLoading } /> }
            </Form>
        </div>
    )
}

Login.defaultProps = {
}


const SmartComp = compose(
    withState(
        'submittedValues',
        'setSubmittedValues',
        {}
    ),
    withState(
        'isLoading',
        'setIsLoading',
        false
    ),
    withState(
        'isError',
        'setIsError',
        false,
    ),
    lifecycle({
    })
)(Login)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
