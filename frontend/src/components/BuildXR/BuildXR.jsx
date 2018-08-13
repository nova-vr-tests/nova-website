// Build XR
import React from 'react'
import API from '../../API.js'
import { styles as appStyles } from '../../constants.js'
import novaLoader from '../img/nova-loader.gif'

const questionTypes = {
    TEXTBOX: 1,
    MULTI: 2,
    TEXTAREA: 3,
}
const questions = [
    {
        type: questionTypes.TEXTBOX,
        question: `What's your email`,
        isRequired: true,
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'Why build XR',
        isRequired: true,
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'Who is the audience',
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'What industry',
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'What problem do you want to solve',
    },
    {
        type: questionTypes.MULTI,
        question: 'What is you budget',
        choices: [
            "< $1.000",
            "$1.000 - $10.000",
            "$10.000 - $100.000",
            "$100.000 +",
        ]
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'Describe your idea',
    },
]

const Question = props => {
    const color = props.isError ? '255, 0, 0': '0, 0, 0'
    const styles = {
        wrapper: {
            position: 'relative',
            color: `rgb(${color})`,
        },
        bullet: {
            position: 'absolute',
            height: '1.5rem',
            width: '1.5rem',
            borderRadius: '50%',
            backgroundColor: `rgba(${color}, 0.5)`,
            left: 'calc(-30px - 0.75rem)',
            top: '50%',
            transform: 'translateY(-50%)',
        }
    }
    return (
        <div style={ styles.wrapper }>
            <h2>{ props.title } ? { props.isRequired ? '*' : ''}</h2>
            <div style={ styles.bullet }>
            </div>
        </div>
    )
}

const Textbox = props => {
    const borderColor = props.isError ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)'
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
        },
    }
    return <input
        type="textbox"
        style={ styles.input }
        onChange={ e => props.onChange(e.target.value) }
        value={ props.value } />
}

const TextArea = props => {
    const styles = {
        textarea: {
            border: '1px solid rgba(0, 0, 0, 0.5)',
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
        cursor: 'pointer',
        borderRadius: '0.5rem',
        transition: 'opacity 0.1s linear',
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
    }

    return (
        <div style={ styles.wrapper }>
            <button
                style={ styles.button }
                onClick={ props.onClick }>
                Submit
            </button>
            <div style={ styles.imageWrapper }>
                <img
                    style={ styles.loader }
                    src={ novaLoader } />
            </div>
        </div>
    )
}

class BuildXR extends React.Component {
    constructor(props) {
        super(props)

        this.questions = questions

        this.state = {
            formState: {},
            isSubmitting: false,
        }

        this.successMessage = (
            <div style={{ color: 'white', fontSize: '1.4rem' }}>
                <b>Thank you</b> for taking the first step toward building your XR solution! Soon we will contact you with a <b>personalized email</b>.
            </div>
        )
        this.errorMessage = (
            <div style={{ color: 'white', fontSize: '1.5rem' }}>
              Your form contains error!
            </div>
        )
        this.introText = "Extended Reality may provide a variety of solutions across a range of industries. By answering these five questions, you provide us with tools for applying XR to your needs. Marketing, training, and internal productivity begin to outline the scope of XR applications."

        this.createForm = this.createForm.bind(this)
        this.onTextboxChange = this.onTextboxChange.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.submit = this.submit.bind(this)
        this.resetFormState = this.resetFormState.bind(this)
        this.validateFormState = this.validateFormState.bind(this)
    }

    componentWillMount() {
        this.props.setHeaderText(this.introText)
    }

    componentDidMount() {
        this.resetFormState()
    }

    componentWillUnmount() {
        this.props.setHeaderText('')
    }

    validateFormState() {
        const { formState } = this.state

        let isFormError = false
        for(let i in formState) {
            const { isRequired, type }= formState[i]

            switch(type) {
            case questionTypes.TEXTBOX:
                if(isRequired && formState[i].answer === '') {
                    formState[i].isError = true
                    isFormError = true
                } else {
                    formState[i].isError = false
                }
                break
            case questionTypes.MULTI:
                if(isRequired && !formState[i].answer.size) {
                    formState[i].isError = true
                    isFormError = true
                } else {
                    formState[i].isError = false
                }
                break
            case questionTypes.TEXTAREA:
                if(isRequired && formState[i].answer === '') {
                    formState[i].isError = true
                    isFormError = true
                } else {
                    formState[i].isError = false
                }
                break
            default:
                break
            }
        }

        this.setState({ formState })

        return isFormError
    }

    resetFormState() {
        const { questions }= this
        const formState = questions
        for(let q of formState) {
            // initing answers
            switch(q.type) {
            case questionTypes.TEXBOX:
                q.answer = ''
                break
            case questionTypes.TEXTAREA:
                q.answer = ''
                break
            case questionTypes.MULTI:
                q.answer = new Set()
                break
            default:
                q.answer = ''
                break
            }
        }

        this.setState({ formState })
    }

    onTextboxChange(questionId, value) {
        const { formState } = this.state
        formState[questionId].answer = value

        this.setState({ formState })
    }

    onCheckboxChange(questionId, answerId) {
        const { formState } = this.state
        const { answer } = formState[questionId]
        if(answer.has(answerId)) {
            answer.delete(answerId)
        } else {
            answer.add(answerId)
        }

        formState[questionId].answer = answer

        this.setState({ formState })
    }

    createForm() {
        const form = []

        const { formState } = this.state
        for(let i in formState) {
            const { type, isError, isRequired } = formState[i]
            const question = <Question
                key={ i + formState.length }
                isError={ isError }
                isRequired={ isRequired }
                title={ formState[i].question } />

            let choice
            let value
            switch(type) {
            case questionTypes.TEXTBOX:
                value = formState[i].answer
                choice = <Textbox
                    onChange={ v => this.onTextboxChange(i, v) }
                    value={ value }
                    isError={ isError }
                    key={ i } />
                break
            case questionTypes.MULTI:
                choice = <MultipleChoice
                    key={ i }
                    onChange={ j => this.onCheckboxChange(i, j) }
                    answer={ formState[i].answer }
                    choices={ formState[i].choices } />
                break
            case questionTypes.TEXTAREA:
                value = formState[i].answer
                choice = <TextArea
                    key={ i }
                    onChange={ j => this.onTextboxChange(i, j) }
                    value={ value } />
                break
            default:
                choice = <div key={ i }></div>
                break
            }
            form.push(question)
            form.push(choice)
        }


        return form
    }

    async submit(e) {
        e.preventDefault()
        this.setState({ isSubmitting: true })

        const content =  JSON.stringify(this.state.formState)

        const isFormError = this.validateFormState()

        if(isFormError) {
            this.props.setHeaderText(this.errorMessage)
            this.props.setHeaderTextBgColor('rgba(255, 0, 0, 0.3)')
        } else {
            try {
                await new API().postBuildXR(content)
                await new Promise(r => setTimeout(r, 3000))

                this.props.setHeaderText(this.successMessage)
                this.props.setHeaderTextBgColor('rgba(0, 0, 0, 0.5)')
                this.resetFormState()
            } catch (e) {
                console.log(e)
            }
        }

        this.setState({ isSubmitting: false })
    }

    render() {
        const styles = {
            form: {
                maxHeight: `calc(12.5 * ${appStyles.unitHeight})`,
                position: 'relative',
            },
        }
        return (
            <form style={ styles.form }>
                { this.createForm() }
                <SubmitButton
                    isSubmitting={ this.state.isSubmitting }
                    onClick={ this.submit } />
            </form>
        )
    }
}

export default BuildXR
