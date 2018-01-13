import React from 'react'

import {
    P,
    FlexColumn
} from './UI.jsx'

const NYEIntroComp = props => {
    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <FlexColumn>
                    <P>In stereoscopic 3D virtual reality we will bring you to 10 iconic cities around the world. All you need is the internet.</P>
                    <P>Imagine teleporting from one city to another at a glance!</P>
                    <P>This New Year’s Eve you can travel the world without leaving your living room.</P>
            </FlexColumn>
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
