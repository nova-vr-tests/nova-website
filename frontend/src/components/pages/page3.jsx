// @flow

import React from 'react'

import nyeLayer1 from '../img/partnership/nye/nye-layer1.png'
import nyeLayer2 from '../img/partnership/nye/nye-layer2.png'
import nyeLayer3 from '../img/partnership/nye/nye-layer3.png'
import loginLayer1 from '../img/partnership/login/login-layer1.png'

import { BigText } from './UI.jsx'

import type { ISlide, IPage } from './types.jsx'

/************************************

    NYE

************************************/


const nyePid = Symbol()
const NyeIntro: Array<ISlide> = [
    {
        h1: 'New Year\'s Eve',
        h2: '',
        content: () => 'In stereoscopic 3D virtual reality we will bring you to 10 iconic cities around the world. All you need is the internet.',
        path: '/nye',
        pid: nyePid,
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
]

const NyeLiveStream: Array<ISlide> = [
    {
        h1: 'New Year\'s Eve',
        h2: '360 Live Stream',
        content: () => 'Imagine teleporting from one city to another at a glance!',
        path: '/nye',
        pid: nyePid,
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
        h1: 'New Year\'s Eve',
        h2: '360 Live Stream',
        content: () => 'This New Year’s Eve you can travel the world without leaving your living room.',
        path: '/nye',
        pid: nyePid,
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
        h1: 'New Year\'s Eve',
        h2: '360 Live Stream',
        content: () => 'The streams will be centralized into a computer graphic game engine where you can access all 36 consecutive hours of New Year’s Eve festivities.',
        path: '/nye',
        pid: nyePid,
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
]

const Distribution: Array<ISlide> = [
    {
        h1: 'New Year\'s Eve',
        h2: 'Distribution',
        content: () => 'The WebVR: The future is clear, VR will be accessed through our web browsers. Anyone with YouTube or Facebook can access our New Year’s Eve content, but those with high fidelity headsets and WebVR will navigate the world as the truest pioneers.',
        path: '/nye',
        pid: nyePid,
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
    {
        h1: 'New Year\'s Eve',
        h2: 'Destinations',
        content: () => 'All those who access WebVR and visit all 10 cities, will be entered to win a trip to the city of their choice (+1).',
        path: '/nye',
        pid: nyePid,
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

const Destinations: Array<ISlide> = [
    {
        h1: 'New Year\'s Eve',
        h2: 'Destinations',
        content: () => 'We decided on these 10 locations based on our advanced and data-driven scouting report.   The content will live live across twelve time zones.',
        path: '/nye',
        pid: nyePid,
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
    {
        h1: 'New Year\'s Eve',
        h2: 'Destinations',
        content: () => 'If we had to bring the production to market tomorrow, the destinations would be:  Bikini Taipei, Dubai, Istanbul, Kiev, Paris, New York, Buenos Aires, San Francisco and Juno.',
        path: '/nye',
        pid: nyePid,
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

    LOGIN

************************************/


const loginPid = Symbol()
const Login: Array<ISlide> = [
    {
        h1: 'Login',
        h2: '',
        content: () => <BigText>Coming soon.</BigText>,
        path: '/login',
        pid: loginPid,
        layers: [
            {
                imgUrl: loginLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

    Slide assembly

************************************/


const nyeSlides = [
    NyeIntro,
    NyeLiveStream,
    Distribution,
    Destinations,
]

const loginSlides = [
    Login,
]

const page3: IPage = [
    nyeSlides,
    loginSlides,
]

export default page3
