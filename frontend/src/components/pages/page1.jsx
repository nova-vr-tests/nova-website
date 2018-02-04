// @flow

import * as React from 'react'

import intro from '../img/default.jpg'

import designIntro from '../img/design/intro.png'
import worldLayer1 from '../img/design/world-layer1.png'
import worldLayer2 from '../img/design/world-layer2.png'
import storyLayer1 from '../img/design/story-layer1.png'
import storyLayer2 from '../img/design/story-layer2.png'
import storyLayer4 from '../img/design/story-layer3.png'
import storyLayer3 from '../img/design/story-layer4.png'
import interfaceLayer1 from '../img/design/interface-layer1.png'
import interfaceLayer2 from '../img/design/interface-layer2.png'
import interfaceLayer3 from '../img/design/interface-layer3.png'

import technologyIntro from '../img/Technology/intro.png'
import vrLayer1 from '../img/Technology/vr-layer1.png'
import vrLayer2 from '../img/Technology/vr-layer2.jpg'
import vrLayer3 from '../img/Technology/vr-layer3.png'
import vrLayer4 from '../img/Technology/vr-layer4.png'
import vrLayer5 from '../img/Technology/vr-layer5.png'
import vrLayer6 from '../img/Technology/vr-layer6.png'
import arLayer1 from '../img/Technology/ar-layer1.png'
import arLayer2 from '../img/Technology/ar-layer2.png'
import arLayer3 from '../img/Technology/ar-layer3.png'
import expTechLayer1 from '../img/Technology/exp-techs-layer1.jpg'
import expTechLayer2 from '../img/Technology/exp-techs-layer2.jpg'
import expTechLayer3 from '../img/Technology/exp-techs-layer3.jpg'
import expTechLayer4 from '../img/Technology/exp-techs-layer4.jpg'

import businessIntroLayer1 from '../img/business/business-intro-layer1.jpg'
import businessIntroLayer2 from '../img/business/business-intro-layer2.jpg'
import businessIntroLayer3 from '../img/business/business-intro-layer3.jpg'
import servicesLayer1 from '../img/business/services-layer1.png'
import servicesLayer2 from '../img/business/services-layer2.png'
import philoLayer1 from '../img/business/philo-layer1.png'
import disciplinesLayer6 from '../img/business/disciplines-layer1.png'
import disciplinesLayer5 from '../img/business/disciplines-layer2.png'
import disciplinesLayer4 from '../img/business/disciplines-layer3.png'
import disciplinesLayer3 from '../img/business/disciplines-layer4.png'
import disciplinesLayer2 from '../img/business/disciplines-layer5.png'
import disciplinesLayer1 from '../img/business/disciplines-layer6.png'

import { styles as appStyles } from '../../constants.js'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    HomePage,
    DesignIntroComp,
    DesignInterfaceComp,
    StoryComp,
    WorldComp,
    TechIntroComp,
    VRComp,
    ARComp,
    ExpComp,
    BusinessComp,
    ServicesComp,
    PhiloComp,
    DisciplinesComp,
} from './page1Comps.jsx'

import { MainPanel as HomePageMainPanel } from './Home.jsx'


import type { ISlide, IPage } from './types.jsx'

const createLayer = (imgUrl, paralax, opacity) => ({ imgUrl, paralax, opacity })


/************************************

    SITE INTRO

************************************/


let h1 = 'Dream Awake'
let h2 = ''
let path = '/'
let pid = Symbol()
const SiteIntro: Array<ISlide> = [
    {
        h1,
        h2,
        content: () => <HomePage />,
        mainPanelContent: () => <HomePageMainPanel />,
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


pid = Symbol()
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
            <BlogPostList fetchUrl={ new API().urls.products.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.products.list } />,
        showNextSectionArrow: false,
        layers: [createLayer(designIntro, 0, 1)],
    },
]



h1 = 'Services'
h2 = 'Introduction'
path = '/services'
pid = Symbol()
const ServicesIntro: Array<ISlide> = [
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
]



h2 = 'Consultation'
pid = Symbol()
path = '/consultation'
const Consultation: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.consultancies.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.consultancies.list } />,
        layers: [
            createLayer(storyLayer1, 0, 1),
            createLayer(storyLayer2, 0, 0),
            createLayer(storyLayer3, 0, 0),
            createLayer(storyLayer4, 0, 0),
        ]
    },
]



pid = Symbol()
path = '/solutions-production' // to differentiate from /partnership-productions
h2 = 'Production'
const Production: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.solutions_productions.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.solutions_productions.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, 0, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
]


pid = Symbol()
path = '/publishing' // to differentiate from /partnership-productions
h2 = 'Publishing'
const Publishing: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        showNextSectionArrow: false,
        content: () =>
            <BlogPostList fetchUrl={ new API().urls.publishing.list } />,
        mainPanelContent: () =>
           <Blog fetchUrl={ new API().urls.publishing.list } />,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, 0, 1),
            createLayer(worldLayer2, 0, 1),
        ]
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


const designSlides = [
    Products,
]

const businessSlides = [
    ServicesIntro,
    Consultation,
    Production,
    Publishing,
]

const technologySlides = [
    Publications,
]

const page1: IPage = [
    designSlides,
    businessSlides,
    technologySlides,
]

export default page1

export {
    SiteIntro,
}
