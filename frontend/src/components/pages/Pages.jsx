import React from 'react'
import Presentation from '../Presentation/Presentation.jsx'
import transitions from '../Presentation/transitions.js'

import novaXr from './page1.jsx'
import resources from './page2.jsx'
import partnership from './page3.jsx'

import {
    P,
    PageWrapper,
} from './UI.jsx'



const category1 = {
    title: "Nova XR",
    links: [
        {
            title: "Design",
            links: [
                "World",
                "Interface",
                "Story",
            ],
        },
        {
            title: "Technology",
            links: [
                "VR",
                "AR",
                "Related techs",
            ],
        },
        {
            title: "Business",
            links: [
                "Influence",
                "Revolution",
                "Solution",
            ],
        },
    ],
}

const category2 = {
    title: "Resources",
    links: [
        {
            title: "Lab Live",
            links: [
                "Project 1",
                "Project 2",
                "Project 3",
            ],
        },
        {
            title: "News Insights",
            links: [
                "Project 1",
                "Project 2",
                "Project 3",
            ],
        },
        {
            title: "Educational portal",
            links: [
                "Project 1",
                "Project 2",
                "Project 3",
            ],
        },
    ],
}

const category3 = {
    title: "Partnership",
    links: [
        {
            title: "Innovate",
            links: [
            ],
        },
        {
            title: "Improve",
            links: [
            ],
        },
        {
            title: "Strengthen",
            links: [
            ],
        },
    ],
}

const menuLinks = [
    category1,
    category2,
    category3,
]



/**
   Generate menu links and titles
*/
const getMenuLinks = section => {
    return section.map(subSection =>
        subSection.map(presentation =>
            presentation[0].path
        )
    )
}

const makeMenu = (section, i) => {
    const links = section.map((subsection, j) => {
        const subLinks = subsection.map(presentation => {
            return {
                links: presentation[0].h2,
                paths: presentation[0].path,
            }
        })

        return {
            title: menuLinks[i].links[j].title,
            links: subLinks.map(e => e.links),
            paths: subLinks.map(e => e.paths),
        }
    })

    return {
        title: menuLinks[i].title,
        links: links,
    }
}

/**
   Links slides with appropriate transitions
*/
const makePresentationSlide = (slide, i, slides) => {
    const Text = slide.content
    const { bgUrl, path, paralax, linePosition, layers, h1, h2 } = slide

    const comp = () => (
        <PageWrapper>
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
        if(bgUrl === slides[i + 1].bgUrl) {
            nextSlideTransition = transitions.types.BG_PARALAX
        }

    } else if(i === slides.length - 1) {
        // Border conditions
        nextSlideTransition = -1

        // Check previous slide
        if(bgUrl === slides[i - 1].bgUrl) {
            previousSlideTransition = transitions.types.BG_PARALAX
        }

    } else {
        // Compare next slide bgUrl
        if(bgUrl === slides[i + 1].bgUrl) {
            nextSlideTransition = transitions.types.BG_PARALAX
        }

        // Compare previous slide bgUrl
        if(bgUrl === slides[i - 1].bgUrl) {
            previousSlideTransition = transitions.types.BG_PARALAX
        }

    }

return {
        comp,
        bgUrl,
        path,
        paralax,
        h1,
        h2,
        linePosition,
        layers,
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
const menuInput = pages.map(makeMenu)
console.log(menuInput)

const Pages = () => {
    return (
        <Presentation
            pages={ slides.map(makePresentationSlide) } />
    )
}

const routeUrls = sitePages.map(getMenuLinks)

export default Pages

export {
    routeUrls,
    menuLinks,
    menuInput,
}
