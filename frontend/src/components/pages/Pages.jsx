// @flow

import * as React from 'react'
import Presentation from '../Presentation/Presentation.jsx'
import transitions from '../Presentation/transitions.js'

import novaXr, { SiteIntro } from './page1.jsx'
import resources from './page2.jsx'
import partnership from './page3.jsx'

import {
    alignments,
} from './UI.jsx'

import { styles as appStyles } from '../../constants.js'

import type {
    IPage,
    ISlide,
    IMenuSection,
    IMakeMenuOutput,
    IFlatten,
} from './types.jsx'

import type {
    Page as IPresentationSlide,
} from '../Presentation/PresentationTypes.jsx'

import type {
    TransitionTypes as BgTransitionTypes,
} from '../Presentation/transitionTypes.jsx'



// Menu Section and subsection titles
const category1: IMenuSection = {
    title: "Solutions",
    links: [
        {
            title: "Products",
        },
        {
            title: "Consultation",
        },
        {
            title: "Publications",
        },
    ],
}

const category2: IMenuSection = {
    title: "Services",
    links: [
        {
            title: "Design",
        },
        {
            title: "Develop",
        },
        {
            title: "Deploy",
        },
    ],
}

const category3: IMenuSection = {
    title: "Nova XR",
    links: [
        {
            title: "Who we are",
        },
        {
            title: "Partnership",
        },
        {
            title: "Find us",
        },
    ],
}

// Structure containing menu section and subsection titles
const menuLinks: Array<IMenuSection> = [
    category1,
    category2,
    category3,
]



/**
   Get menu subsubsection link paths from pages
*/
const getMenuLinks = (section: IPage) => {
    return section.map(subSection =>
        subSection.map(presentation =>
            presentation[0].path
        )
    )
}


// Create menu component input structure with all (sub(sub))section links and titles
const makeMenu = (section: IPage, i: number): IMakeMenuOutput => {
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
   Returns a slide linked to surrounding slides with appropriate transitions
*/
const makePresentationSlide = (slide: ISlide, i: number, slides: Array<ISlide>): IPresentationSlide => {
    const Text = slide.content || (() => <div></div>)
    const {
        pid,
        path,
        linePosition,
        layers,
        h1,
        h2,
        align,
        mainPanelContent,
        showNextSectionArrow,
        overrideMainPanel,
        overrideHeader,
    } = slide

    const comp = () => (
        <Text />
    )

    // Default transitions
    let nextSlideTransition: BgTransitionTypes = transitions.types.BG_SPLIT
    let previousSlideTransition: BgTransitionTypes = transitions.types.BG_SPLIT

    if(i === 0) {
        // Border conditions
        previousSlideTransition = transitions.types.NONE

        // Check next slide
        if(pid === slides[i + 1].pid) {
            nextSlideTransition = transitions.types.BG_PARALAX
        }

    } else if(i === slides.length - 1) {
        // Border conditions
        nextSlideTransition = transitions.types.NONE

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
        h1,
        h2,
        showNextSectionArrow: showNextSectionArrow === undefined ? true : false,
        linePosition: linePosition ? linePosition : 0,
        layers,
        mainPanelContent,
        overrideMainPanel: overrideMainPanel ? overrideMainPanel : false,
        overrideHeader: overrideHeader ? overrideHeader : false,
        align: align ? align : alignments.left,
        theme: appStyles.themeTypes.defaultTheme,
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
const flatten: IFlatten = arr => ((flat = [].concat(...arr)) => flat.some(Array.isArray) ? flatten(flat) : flat)()

/**
   Site input. From this structure is infered:
   - urls
   - menu links and title
   - slide transitions
*/
const sitePages: Array<IPage> = [
    novaXr,
    resources,
    partnership,
]

// Store all site paths in flat array
const routeUrls = sitePages.map(getMenuLinks)

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

// Creating menu from page array structure
const menuInput = pages.map(makeMenu)



// Now that site structure was infered from slide array nesting structure, we can flatten the slides array. This will be the presentation input
let slides: Array<ISlide> = flatten(pages)

// Adding site root before all other slides
slides = [...SiteIntro, ...slides]


const Pages = () => {
    return (
        <Presentation
            pages={ slides.map(makePresentationSlide) } />
    )
}



export default Pages

export {
    routeUrls,
    menuLinks,
    menuInput,
    slides,
}
