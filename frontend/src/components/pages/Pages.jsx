import React from 'react'
import Presentation from '../Presentation/Presentation.jsx'
import transitions from '../Presentation/transitions.js'

import novaXr from './page1.jsx'
import resources from './page2.jsx'
import partnership from './page3.jsx'

import {
    pageWrapper,
    H1,
    H2,
    P,
    Text,
    PageWrapper,
} from './UI.jsx'

/**
   Generate menu links and titles
*/
const makeMenu = (section, i, sections) => {
    return section.map(subSection =>
        subSection.map(presentation =>
            presentation[0].path
        )
    )
}


/**
   Links slides with appropriate transitions
*/
const makePresentationSlide = (slide, i, slides) => {
    const Text = slide.content
    const { bgUrl, path, paralax, linePosition } = slide

    const comp = props => (
        <PageWrapper>
            <H1>{ slide.h1 }</H1>
            <H2>{ slide.h2 }</H2>
            <P>
                <Text />
            </P>
        </PageWrapper>
    )

    // Default transitions
    let nextSlideTransition = transitions.types.BG_SPLIT
    let previousSlideTransition = transitions.types.BG_SPLIT

    if(i === 0) {
        // Border conditions
        previousSlideTransition = -1

        // Check next slide
        if(bgUrl === slides[i + 1].bgUrl)
            nextSlideTransition = transitions.types.BG_PARALAX

    } else if(i === slides.length - 1) {
        // Border conditions
        nextSlideTransition = -1

        // Check previous slide
        if(bgUrl === slides[i - 1].bgUrl)
            previousSlideTransition = transitions.types.BG_PARALAX

    } else {
        // Compare next slide bgUrl
        if(bgUrl === slides[i + 1].bgUrl)
            nextSlideTransition = transitions.types.BG_PARALAX

        // Compare previous slide bgUrl
        if(bgUrl === slides[i - 1].bgUrl)
            previousSlideTransition = transitions.types.BG_PARALAX

    }

return {
        comp,
        bgUrl,
        path,
        paralax,
        linePosition,
        transitions: {
            nextSlide: {
                bg: nextSlideTransition,
            },
            previousSlide: {
                bg: previousSlideTransition,
            }
        }
    }
}


/**
  Dark magic functional prog, flattens an array
*/
const flatten = arr => ((flat = [].concat(...arr)) => flat.some(Array.isArray) ? flatten(flat) : flat)()

/**
   Site input. From this structure is infered:
   - urls
   - menu links and title
   - slide transitions
*/
const sitePages = [
    novaXr,
    resources,
    partnership,
]

/**
   Adds line height to each slide based on where it is in sitePages
*/
const pages = sitePages.map((section, i) =>
    section.map(subsection =>
        subsection.map(presentation =>
            presentation.map(slide =>
                ({
                    ...slide,
                    linePosition: i,
                })
            )
        )
    )
)

const slides = flatten(pages)

const Pages = props => {
    return (
        <Presentation
            pages={ slides.map(makePresentationSlide) } />
    )
}

const routeUrls = sitePages.map(makeMenu)
console.log(routeUrls)

export default Pages

export {
    routeUrls,
}
