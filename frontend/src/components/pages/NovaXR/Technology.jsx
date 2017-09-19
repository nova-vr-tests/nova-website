import React from 'react'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from '../UI.jsx'

const VR = props => {
        return (
        <PageWrapper>
            <H1>Virtual Reality</H1>
            <P>
                VR is the closest we’ve come to arriving in a new dimension. When completely immersed we can move and feel and create and discover. It’s a world in it’s infancy. A world ready for the next wave.
            </P>
        </PageWrapper>
    )
}

const AR = props => {
    return (
        <PageWrapper>
            <H1>Augmented Reality</H1>
            <P>
                AR is a new way of experiencing the physical world. Where to highlight, where to enhance, where to see differently. The choice is ours and new discovery is the result.
            </P>
        </PageWrapper>
    )
}

const RelatedTechs = props => {
    return (
        <PageWrapper>
            <H1>Related Technologies</H1>
            <P>
                Immersive technology is a budding world and every day we’re breaking through toward its next form.
            </P>
        </PageWrapper>
    )
}

export {
    VR,
    AR,
    RelatedTechs,
}
