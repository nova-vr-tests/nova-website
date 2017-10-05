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

const EdPortal1 = [
    {
        h1: 'Educational Portal',
        h2: 'section 1',
        content: () => '',
        path: '/educational-portal-1',
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


const EdPortal2 = [
    {
        h1: 'Educational Portal',
        h2: 'Section 2',
        content: () => '',
        path: '/educational-portal-2',
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
const EdPortal3 = [
    {
        h1: 'Educational Portal',
        h2: 'Section 3',
        content: () => '',
        path: '/educational-portal-3',
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
        h2: 'Intro',
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


const News1 = [
    {
        h1: 'News Insights',
        h2: 'Section 1',
        content: () => '',
        path: '/news-insights-1',
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

const News2 = [
    {
        h1: 'News Insights',
        h2: 'Section 2',
        content: () => '',
        path: '/news-insights-2',
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

const News3 = [
    {
        h1: 'News Insights',
        h2: 'Section 3',
        content: () => '',
        path: '/news-insights-3',
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

    LOGIN

************************************/


const Login = [
    {
        h1: 'Login',
        h2: '',
        content: () => 'Login',
        path: '/login',
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
    EdPortal1,
    EdPortal2,
    EdPortal3,
]

const newsSlides = [
    NewsIntro,
    News1,
    News2,
    News3,
]

const loginSlides = [
    Login,
]

export default [
    edSlides,
    newsSlides,
    loginSlides,
]
