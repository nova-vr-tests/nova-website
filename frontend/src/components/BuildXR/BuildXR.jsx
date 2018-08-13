// Build XR
import React from 'react'
import API from '../../API.js'
import { styles as appStyles } from '../../constants.js'

const questionTypes = {
    TEXTBOX: 1,
    MULTI: 2,
    TEXTAREA: 3,
}
const questions = [
    {
        type: questionTypes.TEXTBOX,
        question: `What's your email`,
    },
    {
        type: questionTypes.TEXTAREA,
        question: 'Why do you want to build',
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
        type: questionTypes.MULTI,
        question: 'What industries interest you',
        choices: [
            "Aeronautics",
            "Sports",
            "Fashion",
            "Storytelling",
            "Marketing",
            "Other",
        ]
    },
]

const Question = props => {
    return <h3>{ props.title } ?</h3>
}

const Textbox = props => {
    return <input
        type="textbox"
        onChange={ e => props.onChange(e.target.value) }
        value={ props.value } />
}

const TextArea = props => {
    return <textarea
        cols="40"
        rows="5"
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
    const styles = {
        button: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: 'none',
            color: 'white',
            padding: `calc(0.25 * ${appStyles.unitWidth}) calc(1.5 * ${appStyles.unitWidth})`,
            margin: `calc(0.25 * ${appStyles.unitWidth})`,
            cursor: 'pointer',
        }
    }
    return (
        <button
            style={ styles.button }
            onClick={ props.onClick }>
            Submit
        </button>
    )
}

class BuildXR extends React.Component {
    constructor(props) {
        super(props)

        this.questions = questions

        this.state = {
            formState: {},
        }

        this.successMessage = "Form submitted"

        this.createForm = this.createForm.bind(this)
        this.onTextboxChange = this.onTextboxChange.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.submit = this.submit.bind(this)
        this.resetFormState = this.resetFormState.bind(this)
    }

    componentWillMount() {
        this.props.setHeaderText(`We'll help your build XR :)`)
    }

    componentDidMount() {
        this.resetFormState()
    }

    componentWillUnmount() {
        this.props.setHeaderText('')
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
            const { type } = formState[i]
            const question = <Question key={ i + formState.length } title={ formState[i].question } />

            let choice
            let value
            switch(type) {
            case questionTypes.TEXTBOX:
                value = formState[i].answer
                choice = <Textbox
                    onChange={ v => this.onTextboxChange(i, v) }
                    value={ value }
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

        form.push(<SubmitButton key={ -1 } onClick={ this.submit } />)

        return form
    }

    async submit(e) {
        e.preventDefault()
        const content =  JSON.stringify(this.state.formState)
        try {
            await new API().postBuildXR(content)

            this.props.setHeaderText(this.successMessage)
            this.resetFormState()
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const styles = {
            form: {
                maxHeight: `calc(12.5 * ${appStyles.unitHeight})`,
            }
        }
        return (
            <form style={ styles.form }>
              { this.createForm() }
            </form>
        )
    }
}

export default BuildXR
