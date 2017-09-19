import React from 'react'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from '../UI.jsx'

const World = props => {
    props.updateLinePosition(0)

    return (
        <PageWrapper>
            <H1>World</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const Interface = props => {
    props.updateLinePosition(0)

    return (
        <PageWrapper>
            <H1>Interface</H1>
            <P>
                We created a means of interaction and called it the flower. It’s not a thing to see but rather a place to arrive. It’s a symbol of exploration and the result of curiosity. It the source which allows us to flourish as we plunge further and design more of this new dimension.
            </P>
        </PageWrapper>
    )
}

const Story = props => {
    props.updateLinePosition(0)

    return (
        <PageWrapper>
            <H1>Story</H1>
            <P>
                For too long we’ve been passive viewers of media. In front of screens we’ve sat and watched as the very few write the story of the past and present. But our future holds something revolutionary - a place where each of our decisions cause recognizable results. We’re walking into a world where we create our own story and feel it unfold.
            </P>
        </PageWrapper>
    )
}

export {
    World,
    Interface,
    Story,
}