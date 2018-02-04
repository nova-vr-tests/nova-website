// @flow

import * as React from 'react'

import intro from '../img/default.jpg'

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

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import {
    EdIntroComp,
    EdComp,
    SolutionsComp,
    InsightsComp,
    ComingSoon,
} from './page2Comps.jsx'

import type { ISlide, IPage } from './types.jsx'

/************************************

    Educational Portal

************************************/

const edIntroPid = Symbol()
const edIntroH1 = 'Eductional Portal'
const edIntroH2 = 'Introduction'

const EducationIntro: Array<ISlide> = [
    {
        h1: edIntroH1,
        h2: edIntroH2,
        content: () => <EdIntroComp />,
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
const Education: Array<ISlide> = [
    {
        h1: edIntroH1,
        h2: 'Education',
        content: () => <EdComp />,
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
        h1: edIntroH1,
        h2: 'Education',
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
        h1: edIntroH1,
        h2: 'Education',
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
        h1: edIntroH1,
        h2: 'Education',
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
    {
        h1: edIntroH1,
        h2: 'Education',
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
const Solutions: Array<ISlide> = [
    {
        h1: edIntroH1,
        h2: 'Solutions',
        content: () => <SolutionsComp />,
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
const Insights: Array<ISlide> = [
    {
        h1: edIntroH1,
        h2: 'Insights',
        content: () => <InsightsComp />,
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
        h1: edIntroH1,
        h2: 'Insights',
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
        h1: edIntroH1,
        h2: 'Insights',
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
        h1: edIntroH1,
        h2: 'Insights',
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
const newsH1 = 'News Insights'
const newsH2 = ''

const NewsIntro: Array<ISlide> = [
    {
        h1: newsH1,
        h2: newsH2,
        content: () => <ComingSoon />,
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
const FeaturedContent: Array<ISlide> = [
    {
        h1: 'News Insights',
        h2: 'Featured Content',
        content: () => <ComingSoon />,
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
const TwitterFeed: Array<ISlide> = [
    {
        h1: 'News Insights',
        h2: 'Twitter Feed',
        content: () => <ComingSoon />,
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

    PUBLISHING

************************************/


const pubPid = Symbol()
const PublishingIntro: Array<ISlide> = [
    {
        h1: 'Publishing',
        h2: '',
        content: () => <ComingSoon />,
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
const Design: Array<ISlide> = [
    {
        h1: 'Publishing',
        h2: 'Design',
        content: () => <ComingSoon />,
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
const Interactions: Array<ISlide> = [
    {
        h1: 'Publishing',
        h2: 'Interactions',
        content: () => <ComingSoon />,
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
const Strategy: Array<ISlide> = [
    {
        h1: 'Publishing',
        h2: 'Strategy',
        content: () => <ComingSoon />,
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


const edSlides: Array<Array<ISlide>> = [
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

const page2: IPage = [
    edSlides,
    newsSlides,
    publicationSlides,
]

export default page2
