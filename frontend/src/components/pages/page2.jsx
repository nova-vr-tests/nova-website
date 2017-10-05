import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'


/************************************

    Educational Portal

************************************/


const EdPortalIntro = [
    {
        h1: 'Educational Portal',
        h2: 'Intro',
        content: () => '',
        path: '/educational-portal',
        paralax: 0,
        bgUrl: bg3,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const Education = [
    {
        h1: 'Educational Portal',
        h2: 'Education',
        content: () => '',
        path: '/education',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


const Solutions = [
    {
        h1: 'Educational Portal',
        h2: 'Solutions',
        content: () => '',
        path: '/ed-solutions',
        paralax: 0,
        bgUrl: bg3,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]
const Insights = [
    {
        h1: 'Educational Portal',
        h2: 'Insights',
        content: () => '',
        path: '/ed-insights',
        paralax: 0,
        bgUrl: bg1,
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

    New Insights

************************************/



const NewsIntro = [
    {
        h1: 'News Insights',
        h2: '',
        content: () => '',
        path: '/news-insights',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


const FeaturedContent = [
    {
        h1: 'News Insights',
        h2: 'Featured Content',
        content: () => '',
        path: '/featured-content',
        paralax: 0,
        bgUrl: bg1,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const TwitterFeed = [
    {
        h1: 'News Insights',
        h2: 'Twitter Feed',
        content: () => '',
        path: '/twitter',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const LabLive = [
    {
        h1: 'News Insights',
        h2: 'Lab Live',
        content: () => '',
        path: '/lab-live',
        paralax: 0,
        bgUrl: bg3,
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


const PublishingIntro = [
    {
        h1: 'Publishing',
        h2: '',
        content: () => 'TBD',
        path: '/publishing',
        bgUrl: bg1,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const Design = [
    {
        h1: 'Publishing',
        h2: 'Design',
        content: () => 'TBD',
        path: '/design-publications',
        bgUrl: bg2,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]
const Interactions = [
    {
        h1: 'Publishing',
        h2: 'Interactions',
        content: () => 'TBD',
        path: '/interaction-publications',
        bgUrl: bg3,
        layers: [
            {
                imgUrl: bg3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]
const Strategy = [
    {
        h1: 'Publishing',
        h2: 'Strategy',
        content: () => 'TBD',
        path: '/strategy-publications',
        bgUrl: bg1,
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
    EdPortalIntro,
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
