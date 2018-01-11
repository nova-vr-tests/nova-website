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

const statusOptions = [
    {
        label: 'Single',
        value: 'single'
    },
    {
        label: 'In a Relationship',
        value: 'relationship'
    },
    {
        label: "It's Complicated",
        value: 'complicated'
    }
]

const usernameValidator = async (username) => {
    await new Promise(function(resolve, reject) {
        setTimeout(resolve, 1000);
    })

    const validation = { error: 'test error', success: null }
    console.log(validation)
    return validation
}

const asyncValidators = {
    username: usernameValidator,
}

const Login = props => {
    const styles = getStyles(props)

    return (
        <Form
            asyncValidators={ asyncValidators }
            onSubmit={submittedValues => props.setSubmittedValues(submittedValues)}>
            { formApi => (
                <form
                    style={ styles.wrapper }
                    onSubmit={formApi.submitForm}
                    id="form2">
                    <Text
                        style={ styles.input }
                        placeholder="Username"
                        field="username"
                        id="username" />
                    <Text
                        style={ styles.input }
                        type="password"
                        placeholder="Password"
                        field="password"
                        id="password" />
                    <button
                        type="submit"
                        style={ styles.button }>
                        Login
                    </button>
                    {
                        JSON.stringify(formApi.errors) !== '{}' && !formApi.asyncValidations ? 'error' : ''
                    }

                {
                    formApi.asyncValidations ?
                        'LOADING...'
                    :
                        ''
                }
                </form>
            )}
        </Form>
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
        'isValid',
        'setIsValid',
        true,
    ),
    lifecycle({
    })
)(Login)

const ConnectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartComp)

export default ConnectedComp
