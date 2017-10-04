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

import nyeLayer1 from '../img/partnership/nye/nye-layer1.png'
import nyeLayer2 from '../img/partnership/nye/nye-layer2.png'
import nyeLayer3 from '../img/partnership/nye/nye-layer3.png'


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

    NYE

************************************/


const Nye = [
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => '',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => '',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => '',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: -200,
                opacity: 1,
            },
        ]
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

const nyeSlides = [
    Nye,
]

export default [
    edSlides,
    newsSlides,
    nyeSlides,
]
