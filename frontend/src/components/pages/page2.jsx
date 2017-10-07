import React from 'react'

import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'

import educationIntroIntroLayer1 from '../img/resources/educational_portal/educational-portal-intro-layer1.jpg'
import educationLayer1 from '../img/resources/educational_portal/education-layer1.png'
import educationLayer2 from '../img/resources/educational_portal/education-layer2.jpg'
import educationLayer3 from '../img/resources/educational_portal/education-layer3.jpg'
import educationLayer4 from '../img/resources/educational_portal/education-layer4.jpg'

import insightsLayers1 from '../img/resources/insights/insights-layer1.jpg'
import insightsLayers2 from '../img/resources/insights/insights-layer2.jpg'
import insightsLayers3 from '../img/resources/insights/insights-layer3.jpg'
import insightsLayers4 from '../img/resources/insights/insights-layer4.jpg'

import { styles as appStyles } from '../../constants.js'

import { BigText } from './UI.jsx'

/************************************

    Educational Portal

************************************/



const edIntroPid = Symbol()
const EducationIntro = [
    {
        h1: 'Educational Portal',
        h2: '',
        content: () => 'We source knowledge from across the globe. From academia to groundbreaking technology, we collect solutions so you can advance.',
        path: '/education-portal',
        paralax: 0,
        pid: edIntroPid,
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

const edPid = Symbol()
const Education = [
    {
        h1: 'Educational Portal',
        h2: 'Education',
        content: () => 'We provide access to resources from top Universities to underground innovation labs.',
        path: '/education',
        paralax: 0,
        pid: edPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: educationIntroIntroLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: educationLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Education',
        content: () => 'We are currently developing a VR Education Portal, which will provide instant access to a wealth of interactive content.',
        path: '/education',
        paralax: 0,
        pid: edPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: educationIntroIntroLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: educationLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: educationLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Education',
        content: () => 'You will learn from professors, experiment with tinkerers, and match wits with the anonymous avatars of subculture innovation.',
        path: '/education',
        paralax: 0,
        pid: edPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: educationIntroIntroLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: educationLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Education',
        content: () => <BigText>Together we will push the limits of information technologies</BigText>,
        path: '/education',
        paralax: 0,
        pid: edPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: educationIntroIntroLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: educationLayer3,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: educationLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
]


const solutionsPid = Symbol()
const Solutions = [
    {
        h1: 'Educational Portal',
        h2: 'Solutions',
        content: () => 'Education, Public Health, Travel, Entertainment, Space Exploration, Real Estate, Architecture, Design, and many more industries are finding solutions to their gravest challenges by applying XR (Extended Reality) media.',
        path: '/ed-solutions',
        paralax: 0,
        pid: solutionsPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Solutions',
        content: () => 'Soon, XR will be as ubiquitous as mobile devices are today. However, uncovering solutions and making use of the technology is up to those on the ground level.  Share your challenge and we can find a solution together.',
        path: '/ed-solutions',
        paralax: 0,
        pid: solutionsPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const insightsPid = Symbol()
const Insights = [
    {
        h1: 'Educational Portal',
        h2: 'Insights',
        content: () => 'Nova is dedicated to sourcing emerging technologies from around the world.',
        path: '/ed-insights',
        paralax: 0,
        pid: insightsPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: insightsLayers1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: insightsLayers2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Insights',
        content: () => 'Our aim is to make these information technologies available and applicable for you to achieve your goals.',
        path: '/ed-insights',
        paralax: 0,
        pid: insightsPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: insightsLayers1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: insightsLayers3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Insights',
        content: () => 'Stay current on a spectrum of technologies that are intertwining in the new era of augmented experiences.',
        path: '/ed-insights',
        paralax: 0,
        pid: insightsPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: insightsLayers1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers3,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: insightsLayers4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Educational Portal',
        h2: 'Insights',
        content: () => 'As mechanical and biological blend, we’ll keep the light shining on programs that matter.',
        path: '/ed-insights',
        paralax: 0,
        pid: insightsPid,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: insightsLayers1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: insightsLayers4,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

    New Insights

************************************/



const newsPid = Symbol()
const NewsIntro = [
    {
        h1: 'News Insights',
        h2: '',
        content: () => <BigText>Coming soon</BigText>,
        path: '/news-insights',
        paralax: 0,
        pid: newsPid,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


const contentPid = Symbol()
const FeaturedContent = [
    {
        h1: 'News Insights',
        h2: 'Featured Content',
        content: () => <BigText>Coming soon</BigText>,
        path: '/featured-content',
        paralax: 0,
        pid: contentPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const twitterPid = Symbol()
const TwitterFeed = [
    {
        h1: 'News Insights',
        h2: 'Twitter Feed',
        content: () => <BigText>Coming soon</BigText>,
        path: '/twitter',
        paralax: 0,
        pid: twitterPid,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const labPid = Symbol()
const LabLive = [
    {
        h1: 'News Insights',
        h2: 'Lab Live',
        content: () => <BigText>Coming soon</BigText>,
        path: '/lab-live',
        paralax: 0,
        pid: labPid,
        layers: [
            {
                imgUrl: bg3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

    PUBLISHING

************************************/


const pubPid = Symbol()
const PublishingIntro = [
    {
        h1: 'Publishing',
        h2: '',
        content: () => <BigText>Coming soon</BigText>,
        path: '/publishing',
        pid: pubPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const designPid = Symbol()
const Design = [
    {
        h1: 'Publishing',
        h2: 'Design',
        content: () => <BigText>Coming soon</BigText>,
        path: '/design-publications',
        pid: designPid,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const interactionsPid = Symbol()
const Interactions = [
    {
        h1: 'Publishing',
        h2: 'Interactions',
        content: () => <BigText>Coming soon</BigText>,
        path: '/interaction-publications',
        pid: interactionsPid,
        layers: [
            {
                imgUrl: bg3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const strategyPid = Symbol()
const Strategy = [
    {
        h1: 'Publishing',
        h2: 'Strategy',
        content: () => <BigText>Coming soon</BigText>,
        path: '/strategy-publications',
        pid: strategyPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]



/************************************

    Slide assembly

************************************/


const edSlides = [
    EducationIntro,
    Education,
    Solutions,
    Insights,
]

const newsSlides = [
    NewsIntro,
    FeaturedContent,
    TwitterFeed,
    LabLive,
]

const publicationSlides = [
    PublishingIntro,
    Design,
    Interactions,
    Strategy,
]

export default [
    edSlides,
    newsSlides,
    publicationSlides,
]
