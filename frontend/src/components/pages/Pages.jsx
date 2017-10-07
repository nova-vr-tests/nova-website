import React from 'react'
import Presentation from '../Presentation/Presentation.jsx'
import transitions from '../Presentation/transitions.js'

import novaXr, { SiteIntro } from './page1.jsx'
import resources from './page2.jsx'
import partnership from './page3.jsx'

import {
    P,
    PageWrapper,
    alignments,
} from './UI.jsx'

import { styles as appStyles } from '../../constants.js'



const category1 = {
    title: "Nova XR",
    links: [
        {
            title: "Design",
        },
        {
            title: "Technology",
        },
        {
            title: "Business",
        },
    ],
}

const category2 = {
    title: "Resources",
    links: [
        {
            title: "Educational portal",
        },
        {
            title: "News Insights",
        },
        {
            title: "Publishing",
        },
    ],
}

const category3 = {
    title: "Partnership",
    links: [
        {
            title: "New Years Eve",
        },
        {
            title: "Login",
        },
        {
            title: "TBD",
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
    const {
        pid,
        path,
        paralax,
        linePosition,
        layers,
        h1,
        h2,
        theme,
        align,
    } = slide

    const comp = () => (
        <PageWrapper align={ align }>
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
        if(pid === slides[i + 1].pid) {
            nextSlideTransition = transitions.types.BG_PARALAX
        }

    } else if(i === slides.length - 1) {
        // Border conditions
        nextSlideTransition = -1

        // Check previous slide
        if(pid === slides[i - 1].pid) {
            previousSlideTransition = transitions.types.BG_PARALAX
        }

    } else {
        // Compare next slide pid
        if(pid === slides[i + 1].pid) {
            nextSlideTransition = transitions.types.BG_PARALAX
        }

        // Compare previous slide pid
        if(pid === slides[i - 1].pid) {
            previousSlideTransition = transitions.types.BG_PARALAX
        }

    }

return {
        comp,
        pid,
        path,
        paralax,
        h1,
        h2,
        linePosition,
        layers,
        align: align ? align : alignments.left,
        theme: theme ? theme : appStyles.themeTypes.defaultTheme,
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

let slides = flatten(pages)
const menuInput = pages.map(makeMenu)
slides = [...SiteIntro, ...slides]

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
    slides,
}
