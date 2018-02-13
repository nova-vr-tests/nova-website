import React from 'react'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

import {
    P,
    FlexColumn
} from './UI.jsx'

const FindUs = props => {
    const source = `### Our office
481 Van Brunt

Brooklyn, New York 11231, United States
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

const Philosophy = props => {
    const source = `### *Do unto others*

As pioneers our duty is to explore new media, publish our findings, and map the way.

The fringe of technology is full of ethical complexities and it is our responsibility to set a high moral standard for the industry.

We lead by example, challenge traditional structures and fight for underdogs.

*We Dream Awake*.

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

const Community = props => {
    const source = `### Philanthropy

We provide education and access to those with less opportunity. May it be teaching Red Hook West Housing Project’s youth how to code, or brining internet and PCs to under developed villages, we are on determined be the change that betters the world.

#### Join our mission to spread good fortune.

##### Local

    programming, art and business plasses for project kids
    design classes

##### global

Connect the isolated

Provide internet access to remote villages in Albania, eabling them to connect with the world. Further, we provide free online classes and mentor them in developing their computer skills. These skills allow them to be be paid at 6-factor of the current rate to work at a bazzar, airport, or restuarant. They will provide for their entire family through remote computer work.`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

const NYEIntroComp = props => {
    const source = `Nova XR is a team of artists and technicians programming new media. Our specialty is XR (Extended Reality). We develop from the 4th floor of the 1880’s Beard Street Warehouses, in Brooklyn, New York.

“Nova” is latin for new, contrasting the future with fundamentals. We chose the name because it is simple, versatile and expressive of our work to innovate media technologies.

Virtual Reality brings us to a place where the confines of the physical world can disapear. Time and gravity and our relationship with space have been as much a part of the human experience as our need for air. Now, as the architects of these virtual worlds, we breathe the same air while breaking free from physical measurements.

We’re reminded of our quest for this new idea of freedom every time we look out the window of our Nova Studios in South Brooklyn and see Liberty Island and her.

100 years after the United States formed its own union, the French designed and built the Statue of Liberty to honor this new version of freedom. 10 years later the statue was dedicated on an island in the New York Harbor. It’s emergence was followed by one of the greatest periods of human migration, as nearly 20 million people emigrated through the New York Harbor in search of freedom from religious persecution, economic disparity, and tyrannical leadership - elements of their human experience that had shackled them in their home nations.

As these immigrants arrived to the New York Harbor fresh off a months-long journey across the Atlantic, they saw her, 151 feet tall, holding up a beacon of light and with a set of shackles laying broken at her feet.

More than a century later, Nova XR’s studios sit right here in union with her - Extending Reality along a quest to reach this next world.

Two of our co founders trace their lineage back to folks who immigrated across the Atlantic toward the end of the 19th century, while two others come from Paris, the city in which La Liberté éclairant le monde was conceived.

Together we’re a small part of the 21st century movement into Extended Reality, and we’re inviting others to come along.`

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
    const source = `### Interested in Joining Nova as an Apprentice?

Part and full time positions available:

- Apprenticeship Positions:
  - Game Engine Developers
  - Coders & Hackers
  - Graphic Designer, Videographer, Audio Engineer, Animator
  - Office Assistant
  - Operations Manager

- Characteristics
  - Organized
  - Prompt
  - Accountable
  - Thorough
  - Innovative
  - Determined
  - Driven
  - Self-starter

- Skills
  - Video creation
  - Animation
  - Ad audio engineering
  - Photogrammetry
  - Networking
  - Sketch
  - Sales
  - Digital marketing
  - Python
  - Java
  - React
  - Photoshop
  - SQL
  - JS
  - C++
  - Unity
  - Unreal engine
  - WebGL, WebXR / WebVR
  - Blockchain, Ethereum
  - Machine learning
  - Neuro research
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
    Community,
    Philosophy,
    FindUs,
}
