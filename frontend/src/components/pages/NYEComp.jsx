import React from 'react'

import MarkdownParser from '../MarkdownParser/MarkdownParser.jsx'

import {
    P,
    FlexColumn
} from './UI.jsx'

const PartnershipIntro = () => {
    const source = `# Introduction

Business is conducted among people. We love building relationships with folks from all over the world. It's who we are. In the process we've discovered this mentality is the same one that builds strong partnerships. Nova is a place of business because we value the individual, understanding that the financial elements of business emerge from a genuine interest in thy neighbor.`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

const FindUs = () => {
    const source = `Fortunately, we feel at home on the fourth floor of the historic Beard Street Warehouse at the south end of Van Brunt Street in Red Hook, Brooklyn. We pride ourselves on welcoming the widest range of thinkers, entrepreneurs, and artists we can find. Please join us in expanding this mission.

!!! In the end, Nova Studios is a place of business with the furnishings of your best friend's living room. Come and visit us. We are always open.

- 481 Van Brunt Street Brooklyn
- New York, United States. 11231`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

const Philosophy = () => {
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

const Community = () => {
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

const NYEIntroComp = () => {
    const source = `# Introduction

Virtual Reality brings us to a place where the confines of the physical world can disappear. Time and gravity and our relationship with space have been as much a part of the human experience as our need for air. Now, in these virtual worlds, we’re breaking free from these physical measurements.

!!! We're reminded of our quest for this new idea of freedom every time we look out the window of our Nova Studios and see the Statue of Liberty.

100 years after the United States formed its own union, the French designed and built the Statue of Liberty to honor this new version of freedom. It's emergence was followed by one of the greatest periods of human migration, as nearly 20 million people immigrated through the New York Harbor in search of freedom from religious persecution, economic disparity, and tyrannical leadership - elements of their human experience that had shackled them in their home nations.

As these immigrants arrived to the New York Harbor fresh off a weeks-long journey across the Atlantic, they saw her, 151 feet tall, holding up a beacon of light and with a set of shackles laying broken at her feet.

More than a century later, Nova XR's studios sit right here in union with her - Extending Reality along a quest to reach this next world of media.

Two of our co founders trace their lineage back to folks who emigrated across the Atlantic toward the end of the 19th century, while two others come from Paris, the city in which La Liberté éclairant le monde was conceived.

Together we're a small part of the 21st century movement into Extended Reality, and we're inviting others to come along.`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                styles={{ textColor: 'white', fontSize: '1.5rem' }}
                content={ source } />
        </div>
    )
}

const NYEStreamComp = () => {
    const source = `# Nova

Nova XR is a team of artists and engineers programming new media. Our specialty is XR (Extended Reality). We develop from the 4th floor of the 19th century Beard Street Warehouses in Brooklyn, New York.

!!! Nova provides access to advanced technologies, producing XR media for businesses to reduce internal costs and increase sales.

"Nova" is latin for *new*, contrasting the future with fundamentals. We chose the name because it's simple, versatile, and expressive of our work to innovate media technologies.

## Live and let

- Twitter: [@N0vamedia](https://twitter.com/n0vamedia)
- Facebook: https://www.facebook.com/N0vamedia/
- Email: [AnnaIrene@novamedia.nyc](mailto:AnnaIrene@novamedia.nyc)
- Linkedin: [/in/jrmecca](https://www.linkedin.com/in/jrmecca/)
- Instagram: [@novaxrmedia](https://www.instagram.com/novaxrmedia)
- Github: [@mecs13](https://github.com/mecs13)
- Steemit: [@novaxr](https://steemit.com/@novaxr)
- Slack: https://novamedianyc.slack.com
- Telegram: https://t.me/xrnewyork
- Telephone: +1 (732) 903-5537
`

    return (
        <div
            className={ 'NYEComp--wrapper' }>
            <MarkdownParser
                content={ source } />
        </div>
    )
}

const NYEDestComp = () => {
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

const NYEDistrComp = () => {
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
    PartnershipIntro,
    Philosophy,
    FindUs,
}
