import React from 'react'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

import {
    P,
    FlexColumn
} from './UI.jsx'

const NYEIntroComp = props => {
    const source = `Nova is a style of exploration through business, technology, artwork, and human compassion. By controlling our focus we merge the self with its environment. The ego alone is a detriment to our attention span and a road into seclusion. Nova understands itself best when it's immersed in its surroundings - listening, observing, and growing toward a deeper level of understanding. It's the way we conceptualize our service to you.

### Philanthropy
We provide education and access to those with less opportunity. Whether it be teaching the youth of Red Hook West Housing Projects how to code or brining internet and PCs to under developed villages, we are determined to be the change that betters the world.

We provide internet access to remote villages in Albania, enabling them to connect with the world. Further, we provide free online classes and mentor these folks in developing their computer skills. These skills allow them to be be paid at 6-factor of the current rate to work at a bazaar, airport, or restaurant. They provide for their entire family through remote computer work.

Join our mission to spread good fortune.
    `

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

const NYEStreamComp = props => {
    return (
        <div
            className={ 'NYEStreamComp--wrapper' }>
            <FlexColumn>
                <P>Imagine teleporting from one city to another at a glance!</P>
                <P>This New Year’s Eve you can travel the world without leaving your living room.</P>
                <P>The streams will be centralized into a computer graphic game engine where you can access all 36 consecutive hours of New Year’s Eve festivities.</P>
            </FlexColumn>
        </div>
    )
}

const NYEDestComp = props => {
    return (
        <div
            className={ 'NYEDestComp--wrapper' }>
            <FlexColumn>
                <P>We decided on these 10 locations based on our advanced and data-driven scouting report.   The content will live live across twelve time zones.</P>
                <P>If we had to bring the production to market tomorrow, the destinations would be:  Bikini Taipei, Dubai, Istanbul, Kiev, Paris, New York, Buenos Aires, San Francisco and Juno.</P>
            </FlexColumn>
        </div>
    )
}

const NYEDistrComp = props => {
    return (
        <div
            className={ 'NYEDistrComp--wrapper' }>
            <FlexColumn>
            </FlexColumn>
        </div>
    )
}

export {
    NYEIntroComp,
    NYEStreamComp,
    NYEDestComp,
    NYEDistrComp,
}
