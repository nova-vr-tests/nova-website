// @flow

import React from 'react'

import nyeLayer1 from '../img/about-us.png'
import apprenticeships from '../img/apprenticeships.jpg'
import findUsLayer1 from '../img/find-us.jpg'
import loginLayer1 from '../img/partnership/login/login-layer1.png'
import philoLayer1 from '../img/business/philo-layer1.png'
import philoBg from '../img/design/2.jpg'

import type { ISlide, IPage } from './types.jsx'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    NYEIntroComp,
    NYEStreamComp,
    Community,
    Philosophy,
    FindUs as FindUsComp,
} from './NYEComp.jsx'

/************************************

    NYE

************************************/




let h1 = 'Who we are'
let h2 = 'Introduction'
let pid = Symbol()
let path = '/who-we-are'
const WhoWeAre: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEIntroComp />,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]


h2 = 'Apprenticeships'
path = '/apprenticeships'
pid = Symbol('apprenticeships')
const Design: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEStreamComp />,
        layers: [
            {
                imgUrl: apprenticeships,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: apprenticeships,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]

h2 = 'Community'
path = '/community'
pid = Symbol('community')
const Business: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <Community />,
        layers: [
            {
                imgUrl: philoLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: philoLayer1,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]

h2 = 'Philosophy'
path = '/philosophy'
pid = Symbol('technology')
const Technology: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <Philosophy />,
        layers: [
            {
                imgUrl: philoBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: philoBg,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]


/************************************

    LOGIN

************************************/


pid = Symbol('news feed')
path = '/lab-live'
h1 = 'Lab Live'
h2 = ''
const NewsFeed: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.blogPosts.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.blogPosts.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: loginLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]



pid = Symbol('find us')
path = '/find-us'
h1 = 'Find Us'
h2 = ''
const FindUs: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <FindUsComp />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: findUsLayer1,
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
    WhoWeAre,
    Design,
    Business,
    Technology,
]

const loginSlides = [
    NewsFeed,
]

const findUsSlides = [
    FindUs,
]

const page3: IPage = [
    nyeSlides,
    loginSlides,
    findUsSlides,
]

export default page3
