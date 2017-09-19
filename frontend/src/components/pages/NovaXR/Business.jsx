import React from 'react'
import {
    P,
    H1,
    H2,
    PageWrapper,
} from '../UI.jsx'

const Influence = props => {
    props.updateLinePosition(0)

    return (
        <PageWrapper>
            <H1>Influence</H1>
            <H2>Influence</H2>
            <P>Hello here how are we all doing</P>
        </PageWrapper>
    )
}

const Revolution = props => {
    props.updateLinePosition(0)

    return <h1>Revolution</h1>
}

const Solution = props => {
    props.updateLinePosition(0)

    return <h1>Solution</h1>
}

export {
    Influence,
    Revolution,
    Solution,
}

