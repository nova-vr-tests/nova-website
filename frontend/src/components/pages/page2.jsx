import React from 'react'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from './UI.jsx'

import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'


/************************************

    Educational Portal

************************************/


const EdPortalIntro = [
    {
        h1: 'Educational Portal',
        h2: 'Intro',
        content: () => '',
        path: '/educational-portal',
        paralax: 0,
        bgUrl: bg3,
    },
]

const EdPortal1 = [
    {
        h1: 'Educational Portal',
        h2: 'section 1',
        content: () => '',
        path: '/educational-portal-1',
        paralax: 0,
        bgUrl: bg2,
    },
]


const EdPortal2 = [
    {
        h1: 'Educational Portal',
        h2: 'Section 2',
        content: () => '',
        path: '/educational-portal-2',
        paralax: 0,
        bgUrl: bg3,
    },
]
const EdPortal3 = [
    {
        h1: 'Educational Portal',
        h2: 'Section 3',
        content: () => '',
        path: '/educational-portal-3',
        paralax: 0,
        bgUrl: bg1,
    },
]

/************************************

    New Insights

************************************/



const NewsIntro = [
    {
        h1: 'News Insights',
        h2: 'Intro',
        content: () => '',
        path: '/news-insights',
        paralax: 0,
        bgUrl: bg2,
    },
]


const News1 = [
    {
        h1: 'News Insights',
        h2: 'Section 1',
        content: () => '',
        path: '/news-insights-1',
        paralax: 0,
        bgUrl: bg1,
    },
]

const News2 = [
    {
        h1: 'News Insights',
        h2: 'Section 2',
        content: () => '',
        path: '/news-insights-2',
        paralax: 0,
        bgUrl: bg2,
    },
]

const News3 = [
    {
        h1: 'News Insights',
        h2: 'Section 3',
        content: () => '',
        path: '/news-insights-3',
        paralax: 0,
        bgUrl: bg3,
    },
]
/************************************

    Third Category

************************************/


const missingSectionIntro = [
    {
        h1: 'Section 2.3',
        h2: 'intro',
        content: () => '',
        path: '/new-section',
        paralax: 0,
        bgUrl: bg1,
    },
]


const missingSection1 = [
    {
        h1: 'Section 2.3',
        h2: 'Section 1',
        content: () => '',
        path: '/new-section-1',
        paralax: 0,
        bgUrl: bg2,
    },
]

const missingSection2 = [
    {
        h1: 'Section 2.3',
        h2: 'Section 2',
        content: () => '',
        path: '/new-section-2',
        paralax: 0,
        bgUrl: bg3,
    },
    {
        h1: 'Section 2.3',
        h2: 'Section 2 part deux',
        content: () => '',
        path: '/new-section-2',
        paralax: 100,
        bgUrl: bg3,
    },
]

const missingSection3 = [
    {
        h1: 'Section 2.3',
        h2: 'Section 3',
        content: () => '',
        path: '/new-section-3',
        paralax: 0,
        bgUrl: bg1,
    },
]



/************************************

    Slide assembly

************************************/


const edSlides = [
    EdPortalIntro,
    EdPortal1,
    EdPortal2,
    EdPortal3,
]

const newsSlides = [
    NewsIntro,
    News1,
    News2,
    News3,
]

const missingSlides = [
    missingSectionIntro,
    missingSection1,
    missingSection2,
    missingSection3,
]

export default [
    edSlides,
    newsSlides,
    missingSlides,
]
