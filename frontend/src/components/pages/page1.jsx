// @flow

import * as React from 'react'

import intro from '../img/default.jpg'

import productsBg from '../img/design/3.png'
import publicationsBg from '../img/publicationsBg.png'

import consultationBg from '../img/bgs/consultation-intro.jpeg'
import industryBg from '../img/bgs/industry.jpeg'
import learningLabBg from '../img/bgs/learning-lab.png'

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

   Props

 ***********************************/


pid = Symbol('business props')
h1 = 'Business Props'
h2 = ''
path = '/business-props'
const BusinessProps: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `People of every industry are finding solutions to their most stubborn challenges by producing immersive (XR) media content. Share, communicate, and learn faster than ever.` }
                fetchUrl={ new API().urls.businessProps.list } />,
        overrideMainPanel: true,
        overrideHeader: true,
        showNextSectionArrow: false,
        layers: [createLayer(productsBg, 0, 1)],
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
        layers: [
            createLayer(consultationBg, 0, 1),
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
                headerText={ `People of every industry are finding solutions to their most stubborn challenges by producing immersive (XR) media content. Share, communicate, and learn faster than ever.` }
                fetchUrl={ new API().urls.industries.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.industries.list } />,
        layers: [
            createLayer(industryBg, 0, 1),
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
                headerText={ 'Without regard to geographic location, VR unites people inside the same virtual space. This increases productivity within a business and allows those outside the business to empathize with its mission.' }
                fetchUrl={ new API().urls.crossIndustry.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.crossIndustry.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        overrideHeader: true,
        layers: [
            createLayer(industryBg, 0, 1),
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
                headerText={ 'Understanding the root concepts of this advanced technology is crucial to discovering its mpst practical applications. Here we deliver past studies, simple descriptions, and the latest industry news.' }
                fetchUrl={ new API().urls.learningLab.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.learningLab.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        overrideHeader: true,
        layers: [
            createLayer(learningLabBg, 0, 1),
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
        overrideHeader: true,
        content: () =>
            <BlogPostList
                headerText={ 'These Publications are to serve as in depth resources for better understanding financial strategies and market entry. They are part of the free resources Nova provides to the community at large.' }
                fetchUrl={ new API().urls.publications.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.publications.list } />,
        layers: [
            createLayer(publicationsBg, 0, 1),
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
    BusinessProps,
}
