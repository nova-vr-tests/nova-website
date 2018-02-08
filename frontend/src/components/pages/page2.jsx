// @flow

import * as React from 'react'

import intro from '../img/default.jpg'

import bg1 from '../img/design/1.png'

import educationIntroIntroLayer1 from '../img/resources/educational_portal/educational-portal-intro-layer1.jpg'
import { styles as appStyles } from '../../constants.js'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    EdIntroComp,
    EdComp,
} from './page2Comps.jsx'

import type { ISlide, IPage } from './types.jsx'

/************************************

    Educational Portal

************************************/

let pid = Symbol()
let h1 = 'Build XR'
let h2 = ''
let path = '/build-xr'


const BuildXR: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <EdIntroComp />,
        paralax: 0,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

pid = Symbol()
path = '/client-portal'
h1 = 'Client portal'
const ClientPortal: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <EdComp />,
        paralax: 0,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: educationIntroIntroLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


h1 = 'Productions'
pid = Symbol()
path = '/productions'
const Productions: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                fetchUrl={
                    new API().urls.partnership_productions.list } />,
        mainPanelContent: () =>
            <Blog
                fetchUrl={
                    new API().urls.partnership_productions.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]
const labPid = Symbol()
const LabLive: Array<ISlide> = [
    {
        h1: 'News Insights',
        h2: 'Nova Blog',
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.blogPosts.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.blogPosts.list } />,
        showNextSectionArrow: false,
        path: '/blog',
        paralax: 0,
        pid: labPid,
        layers: [
            {
                imgUrl: intro,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

    Slide assembly

************************************/


const edSlides: Array<Array<ISlide>> = [
    BuildXR,
]

const newsSlides = [
    ClientPortal,
]

const publicationSlides = [
    Productions,
]

const page2: IPage = [
    edSlides,
    newsSlides,
    publicationSlides,
]

export default page2
