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

import type { ISlide, IPage } from './types.jsx'

const createLayer = (imgUrl, paralax, opacity) => ({ imgUrl, paralax, opacity })


/************************************

    SITE INTRO

************************************/



const introPid = Symbol()
const SiteIntro: Array<ISlide> = [
    {
        h1: 'Dream Awake',
        h2: '',
        content: () => <HomePage />,
        path: '/',
        pid: introPid,
        linePosition: 0,
        layers: [createLayer(intro, 0, 1)],
    },
]


/************************************

    DESIGN

************************************/


const designPid = Symbol()
const designH1 = 'Design'
const designH2 = 'Introduction'
const Design: Array<ISlide> = [
    {
        h1: designH1,
        h2: designH2,
        path: '/design',
        content: () => <DesignIntroComp />,
        pid: designPid,
        layers: [createLayer(designIntro, 0, 1)],
    },
    {
        h1: designH1,
        h2: designH2,
        path: '/design',
        pid: designPid,
        layers: [createLayer(designIntro, -30, 1)],
    },
]



const interfacePid = Symbol()
const Interface: Array<ISlide> = [
    {
        h1: 'Design',
        h2: 'Interface',
        content: () => <DesignInterfaceComp />,
        path: '/interface',
        pid: interfacePid,
        layers: [
            createLayer(interfaceLayer1, 0, 1),
            createLayer(interfaceLayer2, 0, 1),
            createLayer(interfaceLayer3, 0, 0),
        ],
    },
    {
        h1: 'Design',
        h2: 'Interface',
        path: '/interface',
        pid: interfacePid,
        layers: [
            createLayer(interfaceLayer1, 0, 0),
            createLayer(interfaceLayer2, 0, 1),
            createLayer(interfaceLayer3, 0, 0),
        ]
    },
    {
        h1: 'Design',
        h2: 'Interface',
        path: '/interface',
        pid: interfacePid,
        layers: [
            createLayer(interfaceLayer1, 0, 0),
            createLayer(interfaceLayer2, 0, 1),
            createLayer(interfaceLayer3, 0, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'Interface',
        path: '/interface',
        pid: interfacePid,
        layers: [
            createLayer(interfaceLayer1, 0, 0),
            createLayer(interfaceLayer2, -50, 1),
            createLayer(interfaceLayer3, -50, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'Interface',
        path: '/interface',
        pid: interfacePid,
        layers: [
            createLayer(interfaceLayer1, 0, 0),
            createLayer(interfaceLayer2, -100, 1),
            createLayer(interfaceLayer3, -100, 1),
        ]
    },
]



const storyPid = Symbol()
const Story: Array<ISlide> = [
    {
        h1: 'Design',
        h2: 'Story',
        content: () => <StoryComp />,
        path: '/story',
        pid: storyPid,
        layers: [
            createLayer(storyLayer1, 0, 1),
            createLayer(storyLayer2, 0, 0),
            createLayer(storyLayer3, 0, 0),
            createLayer(storyLayer4, 0, 0),
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        path: '/story',
        pid: storyPid,
        layers: [
            createLayer(storyLayer1, 0, 0),
            createLayer(storyLayer2, 0, 1),
            createLayer(storyLayer3, 0, 0),
            createLayer(storyLayer4, 0, 0),
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        path: '/story',
        pid: storyPid,
        layers: [
            createLayer(storyLayer1, 0, 0),
            createLayer(storyLayer2, 0, 0),
            createLayer(storyLayer3, 0, 1),
            createLayer(storyLayer4, 0, 1),
        ]
    },
]



const worldPid = Symbol()
const World: Array<ISlide> = [
    {
        h1: 'Design',
        h2: 'World',
        content: () => <WorldComp />,
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, 0, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, -25, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, -50, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, -75, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            createLayer(worldLayer1, -100, 1),
            createLayer(worldLayer2, 0, 1),
        ]
    },
]




/************************************

    Business

************************************/


const businessPid = Symbol()
const businessH1 = 'Business'
const businessH2 = 'Introduction'

const Business: Array<ISlide> = [
    {
        h1: businessH1,
        h2: businessH2,
        content: () => <BusinessComp />,
        path: '/business',
        pid: businessPid,
        layers: [
            createLayer(businessIntroLayer1, 0, 1),
            createLayer(businessIntroLayer2, 0, 0),
            createLayer(businessIntroLayer3, 0, 0),
        ]
    },
    {
        h1: businessH1,
        h2: businessH2,
        path: '/business',
        pid: businessPid,
        layers: [
            createLayer(businessIntroLayer1, 0, 0),
            createLayer(businessIntroLayer2, 0, 1),
            createLayer(businessIntroLayer3, 0, 0),
        ]
    },
    {
        h1: businessH1,
        h2: businessH2,
        path: '/business',
        pid: businessPid,
        layers: [
            createLayer(businessIntroLayer1, 0, 0),
            createLayer(businessIntroLayer2, 0, 0),
            createLayer(businessIntroLayer3, 0, 1),
        ]
    },
]



const servicesPid = Symbol()
const Services: Array<ISlide> = [
    {
        h1: 'Business',
        h2: 'Services',
        content: () => <ServicesComp />,
        path: '/services',
        pid: servicesPid,
        layers: [
            createLayer(servicesLayer1, 0, 1),
            createLayer(servicesLayer2, 0, 0),
        ]
    },
    {
        h1: 'Business',
        h2: 'Services',
        path: '/services',
        pid: servicesPid,
        layers: [
            createLayer(servicesLayer1, 0, 1),
            createLayer(servicesLayer2, 0, 1),
        ]
    },
]


const philoPid = Symbol()
const Philosophy: Array<ISlide> = [
    {
        h1: 'Business',
        h2: 'Philosophy',
        content: () => <PhiloComp />,
        path: '/philosophy',
        pid: philoPid,
        layers: [
            createLayer(philoLayer1, 0, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Philosophy',
        path: '/philosophy',
        pid: philoPid,
        layers: [
            createLayer(philoLayer1, -50, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Philosophy',
        path: '/philosophy',
        pid: philoPid,
        layers: [
            createLayer(philoLayer1, -100, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Philosophy',
        path: '/philosophy',
        pid: philoPid,
        layers: [
            createLayer(philoLayer1, -150, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Philosophy',
        path: '/philosophy',
        pid: philoPid,
        layers: [
            createLayer(philoLayer1, -200, 1),
        ]
    },
]


const disciplinesPid = Symbol()
const Disciplines: Array<ISlide> = [
    {
        h1: 'Business',
        h2: 'Disciplines',
        content: () => <DisciplinesComp />,
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            createLayer(disciplinesLayer1, 0, 1),
            createLayer(disciplinesLayer2, 0, 1),
            createLayer(disciplinesLayer3, 0, 1),
            createLayer(disciplinesLayer4, 0, 1),
            createLayer(disciplinesLayer5, 0, 1),
            createLayer(disciplinesLayer6, 0, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            createLayer(disciplinesLayer1, -50, 1),
            createLayer(disciplinesLayer2, -75, 1),
            createLayer(disciplinesLayer3, -100, 1),
            createLayer(disciplinesLayer4, -100, 1),
            createLayer(disciplinesLayer5, -150, 1),
            createLayer(disciplinesLayer6, -200, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            createLayer(disciplinesLayer1, -100, 1),
            createLayer(disciplinesLayer2, -150, 1),
            createLayer(disciplinesLayer3, -200, 1),
            createLayer(disciplinesLayer4, -200, 1),
            createLayer(disciplinesLayer5, -300, 1),
            createLayer(disciplinesLayer6, -400, 1),
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            createLayer(disciplinesLayer1, -150, 1),
            createLayer(disciplinesLayer2, -225, 1),
            createLayer(disciplinesLayer3, -300, 1),
            createLayer(disciplinesLayer4, -300, 1),
            createLayer(disciplinesLayer5, -500, 1),
            createLayer(disciplinesLayer6, -600, 1),
        ]
    },
]



/************************************

    Technology

************************************/



const techPid = Symbol()
const techH1 = 'Technology'
const techH2 = 'Introduction'
const Technology: Array<ISlide> = [
    {
        h1: techH1,
        h2: techH2,
        content: () => <TechIntroComp />,
        path: '/technology',
        pid: techPid,
        layers: [
            createLayer(technologyIntro, 0, 1),
        ]
    },
    {
        h1: techH1,
        h2: techH2,
        path: '/technology',
        pid: techPid,
        layers: [
            createLayer(technologyIntro, 0, 1),
        ]
    },
    {
        h1: techH1,
        h2: techH2,
        path: '/technology',
        pid: techPid,
        layers: [
                createLayer(technologyIntro, 0, 1),
        ]
    },
]



const vrPid = Symbol()
const VR: Array<ISlide> = [
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => <VRComp />,
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
                createLayer(vrLayer1, 0, 1),
                createLayer(vrLayer2, 0, 0),
                createLayer(vrLayer3, 0, 1),
                createLayer(vrLayer4, 0, 0),
                createLayer(vrLayer5, 0, 0),
                createLayer(vrLayer6, 0, 0),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
                createLayer(vrLayer1, 0, 1),
                createLayer(vrLayer2, 0, 0),
                createLayer(vrLayer3, 0, 0),
                createLayer(vrLayer4, 0, 1),
                createLayer(vrLayer5, 0, 0),
                createLayer(vrLayer6, 0, 0),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
                createLayer(vrLayer1, 0, 1),
                createLayer(vrLayer2, 0, 0),
                createLayer(vrLayer3, 0, 0),
                createLayer(vrLayer4, 0, 0),
                createLayer(vrLayer5, 0, 1),
                createLayer(vrLayer6, 0, 0),
        ]
    },
]


ARComp.defaultProps = {
}


const arPid = Symbol()
const AR: Array<ISlide> = [
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => <ARComp />,
        path: '/ar',
        pid: arPid,
        layers: [
                createLayer(arLayer1, 0, 1),
                createLayer(arLayer2, 0, 1),
                createLayer(arLayer3, 0, 0),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        path: '/ar',
        pid: arPid,
        layers: [
                createLayer(arLayer1, -100, 1),
                createLayer(arLayer2, -50, 1),
                createLayer(arLayer3, -50, 1),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        path: '/ar',
        pid: arPid,
        layers: [
                createLayer(arLayer1, -200, 1),
                createLayer(arLayer2, -100, 1),
                createLayer(arLayer3, -100, 1),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        path: '/ar',
        pid: arPid,
        layers: [
                createLayer(arLayer1, -300, 1),
                createLayer(arLayer2, -150, 1),
                createLayer(arLayer3, -150, 1),
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        path: '/ar',
        pid: arPid,
        layers: [
                createLayer(arLayer1, -400, 1),
                createLayer(arLayer2, -200, 1),
                createLayer(arLayer3, -200, 1),
        ]
    },
]



const expPid = Symbol()
const expH2 = 'Exponential Techs'
const expTech: Array<ISlide> = [
    {
        h1: 'Technology',
        h2: expH2,
        content: () => <ExpComp />,
        path: '/expentional-technologies',
        pid: expPid,
        layers: [
                createLayer(expTechLayer1, 0, 1),
                createLayer(expTechLayer2, 0, 0),
                createLayer(expTechLayer3, 0, 0),
                createLayer(expTechLayer4, 0, 0),
        ],
    },
    {
        h1: 'Technology',
        h2: expH2,
        path: '/expentional-technologies',
        pid: expPid,
        layers: [
                createLayer(expTechLayer1, 0, 0),
                createLayer(expTechLayer2, 0, 1),
                createLayer(expTechLayer3, 0, 0),
                createLayer(expTechLayer4, 0, 0),
        ],
    },
    {
        h1: 'Technology',
        h2: expH2,
        path: '/expentional-technologies',
        pid: expPid,
        layers: [
                createLayer(expTechLayer1, 0, 0),
                createLayer(expTechLayer2, 0, 0),
                createLayer(expTechLayer3, 0, 1),
                createLayer(expTechLayer4, 0, 0),
        ],
    },
]


/************************************

    Slide assembly

************************************/


const designSlides = [
        Design,
        World,
        Interface,
        Story,
]

const businessSlides = [
        Business,
        Services,
        Philosophy,
        Disciplines,
]

const technologySlides = [
    Technology,
    VR,
    AR,
    expTech,
]

const page1: IPage = [
    designSlides,
    technologySlides,
    businessSlides,
]

export default page1

export {
    SiteIntro,
}
