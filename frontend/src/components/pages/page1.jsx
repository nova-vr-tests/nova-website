// @flow

import * as React from 'react'

import intro from '../img/default.jpg'

import productsBg from '../img/design/3.png'
import worldLayer1 from '../img/design/world-layer1.png'
import worldLayer2 from '../img/design/world-layer2.png'
import storyLayer1 from '../img/design/story-layer1.png'
import storyLayer2 from '../img/design/story-layer2.png'
import storyLayer4 from '../img/design/story-layer3.png'
import storyLayer3 from '../img/design/story-layer4.png'
import interfaceLayer1 from '../img/design/interface-layer1.png'
import interfaceLayer2 from '../img/design/interface-layer2.png'
import interfaceLayer3 from '../img/design/interface-layer3.png'

import businessIntroLayer1 from '../img/business/business-intro-layer1.jpg'
import businessIntroLayer2 from '../img/business/business-intro-layer2.jpg'
import businessIntroLayer3 from '../img/business/business-intro-layer3.jpg'

import { styles as appStyles } from '../../constants.js'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import ProductsList from '../Products/Products.jsx'
import API from '../../API.js'

import {
    HomePage,
    DesignInterfaceComp,
} from './page1Comps.jsx'


import type { ISlide, IPage } from './types.jsx'

const createLayer = (imgUrl, paralax, opacity) => ({ imgUrl, paralax, opacity })


/************************************

    SITE INTRO

************************************/


let h1 = ''
let h2 = ''
let path = '/'
let pid = Symbol()
const SiteIntro: Array<ISlide> = [
    {
        h1,
        h2,
        content: () => <HomePage />,
        overrideMainPanel: true,
        overrideHeader: true,
        showNextSectionArrow: false,
        path,
        pid,
        linePosition: 0,
        layers: [createLayer(intro, 0, 1)],
    },
]


/************************************

    DESIGN

***********************************/


pid = Symbol('products')
h1 = 'Products'
h2 = ''
path = '/products'
const Products: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <ProductsList fetchUrl={ new API().urls.products.list } />,
        overrideMainPanel: true,
        overrideHeader: true,
        showNextSectionArrow: false,
        layers: [createLayer(productsBg, 0, 1)],
    },
]



h1 = 'Consultation'
h2 = 'Introduction'
path = '/services'
pid = Symbol()
const consultationIntro: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <DesignInterfaceComp />,
        showNextSectionArrow: true,
        layers: [
            createLayer(interfaceLayer1, 0, 1),
            createLayer(interfaceLayer2, 0, 1),
            createLayer(interfaceLayer3, 0, 0),
        ],
    },
    {
        layers: [
            createLayer(interfaceLayer1, 100, 1),
            createLayer(interfaceLayer2, 0, 1),
            createLayer(interfaceLayer3, 0, 0),
        ],
    },
]



h2 = 'Industry'
pid = Symbol()
path = '/industry'
const industry: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList
                headerText={ `Industry :)` }
                fetchUrl={ new API().urls.industries.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.industries.list } />,
        layers: [
            createLayer(storyLayer1, 0, 1),
            createLayer(storyLayer2, 0, 0),
            createLayer(storyLayer3, 0, 0),
            createLayer(storyLayer4, 0, 0),
        ],
        overrideHeader: true,
    },
]



pid = Symbol()
path = '/cross-industry' // to differentiate from /partnership-productions
h2 = 'Cross Industry'
const crossIndustry: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList
                headerText={ 'Cross Industry :)' }
                fetchUrl={ new API().urls.crossIndustry.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.crossIndustry.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        overrideHeader: true,
        layers: [
            createLayer(worldLayer1, 0, 1),
            createLayer(worldLayer2, 0, 1),
        ],
    },
]


pid = Symbol()
path = '/learning-lab' // to differentiate from /partnership-productions
h2 = 'Leaning Lab'
const learningLab: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList
                headerText={ ' Learning Lab :)' }
                fetchUrl={ new API().urls.learningLab.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.learningLab.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        overrideHeader: true,
        layers: [
            createLayer(worldLayer1, 0, 1),
            createLayer(worldLayer2, 0, 1),
        ],
    },
]


/************************************

    Business

************************************/


pid = Symbol()
h1 = 'Publications'
h2 = ''
path = '/publications'

const Publications: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.publications.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.publications.list } />,
        layers: [
            createLayer(businessIntroLayer1, 0, 1),
            createLayer(businessIntroLayer2, 0, 0),
            createLayer(businessIntroLayer3, 0, 0),
        ]
    },
]

/************************************

    Slide assembly

************************************/


const productSlides = [
    Products,
]

const consultationSlides = [
    consultationIntro,
    industry,
    crossIndustry,
    learningLab,
]

const publicationSlides = [
    Publications,
]

const page1: IPage = [
    productSlides,
    consultationSlides,
    publicationSlides,
]

export default page1

export {
    SiteIntro,
}
