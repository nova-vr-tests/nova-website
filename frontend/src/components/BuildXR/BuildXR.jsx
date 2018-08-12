// Build XR
import React from 'react'
import API from '../../API.js'

const questionTypes = {
    TEXTBOX: 1,
    MULTI: 2,
}
const questions = [
    {
        type: questionTypes.TEXTBOX,
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

const Checkbox = props => {
    return <input
        type="checkbox"
        value={ props.value }
        onChange={ () => props.onChange(props.id) } />
}

const MultipleChoice = props => {
    const comp = []
    const { choices } = props

    for(let i in choices) {
        const checkbox = <div key={ i }>
                <Checkbox
                    onChange={ () => props.onChange(i) }
                    value={ props.answer.has(i) } />
                <div>{ choices[i] }</div>
            </div>

        comp.push(checkbox)
    }

    return comp
}

const SubmitButton = props => {
    return <button onClick={ props.onClick }>Submit</button>
}

class BuildXR extends React.Component {
    constructor(props) {
        super(props)

        this.questions = questions
        const formState = this.questions
        for(let q of formState) {
            // initing answers
            q.answer = q.type === questionTypes.TEXTBOX ? '' : new Set()
        }

        this.state = {
            formState,
        }

        this.createForm = this.createForm.bind(this)
        this.onTextboxChange = this.onTextboxChange.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentWillMount() {
        this.props.setHeaderText(`We'll help your build XR :)`)
    }

    componentWillUnmount() {
        this.props.setHeaderText('')
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
            if(type === questionTypes.TEXTBOX) {
                choice = <Textbox
                    onChange={ v => this.onTextboxChange(i, v) }
                    key={ i } />
            } else {
                choice = <MultipleChoice
                    key={ i }
                    onChange={ j => this.onCheckboxChange(i, j) }
                    answer={ formState[i].answer }
                    choices={ formState[i].choices } />
            }
            form.push(question)
            form.push(choice)
        }

        form.push(<SubmitButton key={ -1 } onClick={ this.submit } />)

        return form
    }

    async submit() {
        const content =  JSON.stringify(this.state.formState)
        const resp = await new API().postBuildXR(content)
        console.log(resp)
    }

    render() {
        return this.createForm()
    }
}

export default BuildXR
