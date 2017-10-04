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
        content: () => '2',
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
                paralax: -200,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => ' last',
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
                paralax: -400,
                opacity: 1,
            },
        ]
    },
]


/************************************

    Partnership 2

************************************/


const PartnershipIntro2 = [
    {
        h1: 'Partnership 2',
        h2: 'Intro',
        content: () => '',
        path: '/partnership-2',
        paralax: 0,
        bgUrl: bg1,
    },
]

const Partnership21 = [
    {
        h1: 'Partnership 2',
        h2: 'section 1',
        content: () => '',
        path: '/partnership-2-1',
        paralax: 0,
        bgUrl: bg2,
    },
]


const Partnership22 = [
    {
        h1: 'Partnership 2',
        h2: 'Section 2',
        content: () => '',
        path: '/partnership-2-2',
        paralax: 0,
        bgUrl: bg3,
    },
]
const Partnership23 = [
    {
        h1: 'Partnership 2',
        h2: 'Section 3',
        content: () => '',
        path: '/partnership-2-3',
        paralax: 0,
        bgUrl: bg2,
    },
]


/************************************

    Partnership 3

************************************/


const PartnershipIntro3 = [
    {
        h1: 'Partnership 3',
        h2: 'Intro',
        content: () => '',
        path: '/partnership-3',
        paralax: 0,
        bgUrl: bg1,
    },
]

const Partnership31 = [
    {
        h1: 'Partnership 3',
        h2: 'section 1',
        content: () => '',
        path: '/partnership-3-1',
        paralax: 0,
        bgUrl: bg2,
    },
]


const Partnership32 = [
    {
        h1: 'Partnership 3',
        h2: 'Section 2',
        content: () => '',
        path: '/partnership-3-2',
        paralax: 0,
        bgUrl: bg3,
    },
]
const Partnership33 = [
    {
        h1: 'Partnership 3',
        h2: 'Section 3',
        content: () => '',
        path: '/partnership-3-3',
        paralax: 0,
        bgUrl: bg2,
    },
]





/************************************

    Slide assembly

************************************/


const nyeSlides = [
    Nye,
]

const partnerhip2 = [
    PartnershipIntro2,
    Partnership21,
    Partnership22,
    Partnership23,
]

const partnerhip3 = [
    PartnershipIntro2,
    Partnership31,
    Partnership32,
    Partnership33,
]

export default [
    nyeSlides,
]