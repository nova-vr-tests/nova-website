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

    return (
        <PageWrapper>
            <H1>Revolution</H1>
            <H2>Revolution</H2>
            <P>
            </P>
        </PageWrapper>
    )
}

const Solution = props => {
    props.updateLinePosition(0)

    return (
        <PageWrapper>
            <H1>Solution</H1>
            <H2>Solution</H2>
            <P>
            </P>
        </PageWrapper>
    )
}

export {
    Influence,
    Revolution,
    Solution,
}

