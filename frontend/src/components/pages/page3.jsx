// @flow

import React from 'react'

import nyeLayer1 from '../img/partnership/nye/nye-layer1.png'
import nyeLayer2 from '../img/partnership/nye/nye-layer2.png'
import nyeLayer3 from '../img/partnership/nye/nye-layer3.png'
import loginLayer1 from '../img/partnership/login/login-layer1.png'

import { BigText, P } from './UI.jsx'

import type { ISlide, IPage } from './types.jsx'

import {
    NYEIntroComp,
    NYEStreamComp,
    NYEDestComp,
    NYEDistrComp,
} from './NYEComp.jsx'

/************************************

    NYE

************************************/




const nyePid = Symbol()
const NyeIntro: Array<ISlide> = [
    {
        h1: 'New Year\'s Eve',
        h2: '',
        content: () => <NYEIntroComp />,
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
        content: () => <NYEStreamComp />,
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
        path: '/nye',
        pid: nyePid,
        content: () => <NYEDistrComp />,
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
        h2: 'Distribution',
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
        content: () => <NYEDestComp />,
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
        content: () => <P><BigText>Coming soon.</BigText></P>,
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
