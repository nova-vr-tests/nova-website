import React from 'react'
import Presentation from '../Presentation/Presentation.jsx'
import transitions from '../Presentation/transitions.js'

import novaXr from './page1.jsx'

import {
    pageWrapper,
    H1,
    H2,
    P,
    Text,
    PageWrapper,
} from './UI.jsx'

const makeMenu = (section, i, sections) => {
    return section.map(subSection =>
        subSection.map(presentation =>
            presentation[0].path
        )
    )
}


const makePresentationSlide = (slide, i, slides) => {
    const Text = slide.content
    const { bgUrl, path, paralax } = slide

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

const resources = [
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
]
const partnership = [
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
    [
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
        [{path: '/'}, {path: '/'}, {path: '/'}, {path: '/'}],
    ],
]
const sitePages = [
    novaXr,
    resources,
    partnership,
]
console.log(sitePages)

const slides = flatten(sitePages)

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
