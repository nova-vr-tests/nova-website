// @flow

import React from 'react'

import nyeLayer1 from '../img/partnership/nye/nye-layer1.png'
import nyeLayer2 from '../img/partnership/nye/nye-layer2.png'
import nyeLayer3 from '../img/partnership/nye/nye-layer3.png'
import loginLayer1 from '../img/partnership/login/login-layer1.png'

import type { ISlide, IPage } from './types.jsx'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    NYEIntroComp,
    NYEStreamComp,
    NYEDestComp,
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
]


h2 = 'Design'
path = '/design'
pid = Symbol('design')
const Design: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEStreamComp />,
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

h2 = 'Business'
path = '/business'
pid = Symbol('business')
const Business: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <p>Business</p>,
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
        h1,
        h2,
        path,
        pid,
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

h2 = 'Technology'
path = '/technology'
pid = Symbol('technology')
const Technology: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEDestComp />,
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
        h1,
        h2,
        path,
        pid,
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


pid = Symbol('news feed')
path = '/news-feed'
h1 = 'News Feed'
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
        content: () => <p>Find us</p>,
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
