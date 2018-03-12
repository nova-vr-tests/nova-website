// @flow

import React from 'react'

import findUsLayer1 from '../img/findUsBg.jpg'
import whoWeAreBg from '../img/whoWeAreBg.jpg'
import aboutUsBg from '../img/aboutUsBg.png'
import communityBg from '../img/communityBg.jpg'
import labLiveBg from '../img/labLiveBg.png'

import type { ISlide, IPage } from './types.jsx'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    NYEIntroComp,
    NYEStreamComp,
    FindUs as FindUsComp,
} from './NYEComp.jsx'

/************************************

    NYE

************************************/




let h1 = 'Who we are'
let h2 = 'Introduction'
let pid = Symbol()
let path = '/who-we-are'
const whoWeAre: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEIntroComp />,
        layers: [
            {
                imgUrl: whoWeAreBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: whoWeAreBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


h2 = 'About Us'
path = '/about-us'
pid = Symbol('about us')
const aboutUs: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <NYEStreamComp />,
        layers: [
            {
                imgUrl: aboutUsBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        pid,
        layers: [
            {
                imgUrl: aboutUsBg,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]

h2 = 'Community'
path = '/community'
pid = Symbol('community')
const community: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Community :)` }
                fetchUrl={ new API().urls.community.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.community.list } />,
        overrideHeader: true,
        layers: [
            {
                imgUrl: communityBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    }
]

pid = Symbol('lab live')
path = '/lab-live'
h2 = 'Lab Live'
const labLive: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Lab Live :)` }
                fetchUrl={ new API().urls.blogPosts.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.blogPosts.list } />,
        overrideHeader: true,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: labLiveBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

   Partnership

 ************************************/


pid = Symbol('partnership')
path = '/partnerhip'
h1 = 'Partnership'
h2 = 'Introduction'
const partnershipIntro: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <div>partnership intro</div>,
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

pid = Symbol('production')
path = '/productions'
h2 = 'Productions'
const productions: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Production :)` }
                fetchUrl={ new API().urls.productions.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.productions.list } />,
        overrideHeader: true,
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

pid = Symbol('partners')
path = '/partners'
h2 = 'Partners'
const partners: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Partners :)` }
                fetchUrl={ new API().urls.partners.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.partners.list } />,
        overrideHeader: true,
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

pid = Symbol('careers')
path = '/careers'
h2 = 'Careers'
const careers: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Careers :)` }
                fetchUrl={ new API().urls.careers.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.careers.list } />,
        overrideHeader: true,
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

    Find Us

************************************/





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


const aboutUsSlides = [
    whoWeAre,
    aboutUs,
    community,
    labLive,
]

const parnershipSlides = [
    partnershipIntro,
    productions,
    partners,
    careers,
]

const findUsSlides = [
    FindUs,
]

const page3: IPage = [
    aboutUsSlides,
    parnershipSlides,
    findUsSlides,
]

export default page3
