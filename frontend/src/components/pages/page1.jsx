import React from 'react'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from './UI.jsx'

import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'

import arLayer1 from '../img/Technology/ar-layer1.png'
import arLayer2 from '../img/Technology/ar-layer2.png'
import arLayer3 from '../img/Technology/ar-layer3.png'

import interfaceLayer1 from '../img/Technology/interface-layer1.png'
import interfaceLayer2 from '../img/Technology/interface-layer2.png'
import interfaceLayer3 from '../img/Technology/interface-layer3.png'
/************************************

    DESIGN

************************************/


const Design = [
    {
        h1: 'Design',
        h2: '',
        content: () => 'The physical world has been a masterful designer. It is infinite in beauty and complexity, veiling mysteries and provoking our wonder. Inexplicable yet endlessly enchanting.  The quest for knowledge and understanding never gets dull, and these unanswerable questions keep pulling us forward.  We are only limited by our imaginations.',
        path: '/design',
        paralax: 0,
        bgUrl: bg1,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Design 2',
        h2: '',
        content: () => 'The adslkfjhads;lkfjdsakfja',
        path: '/design',
        paralax: 0,
        bgUrl: bg1,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: 50,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: 50,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Design 3',
        h2: '',
        content: () => 'The adslkfjhads;lkfjdsakfja',
        path: '/design',
        paralax: 0,
        bgUrl: bg1,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: 100,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: 100,
                opacity: 1,
            },
        ]
    },
]

const World = [
    {
        h1: 'World',
        h2: '',
        content: () => 'What more is there? You’ll soon wonder which was a digital world and which was a dream. Jump into the light. There are no limits. When knowhow grows elusive, look to the sky.  The more you know the more amazing the would seems. The',
        path: '/world',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: interfaceLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: interfaceLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: interfaceLayer3,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'World',
        h2: '',
        content: () => 'What more is there? You’ll soon wonder which was a digital world and which was a dream. Jump into the light. There are no limits. When knowhow grows elusive, look to the sky.  The more you know the more amazing the would seems. The',
        path: '/world',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: interfaceLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: interfaceLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: interfaceLayer3,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'World',
        h2: '',
        content: () => 'What more is there? You’ll soon wonder which was a digital world and which was a dream. Jump into the light. There are no limits. When knowhow grows elusive, look to the sky.  The more you know the more amazing the would seems. The',
        path: '/world',
        paralax: 0,
        bgUrl: bg2,
        layers: [
            {
                imgUrl: interfaceLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: interfaceLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: interfaceLayer3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const Interface = [
    {
        h1: 'Interface',
        h2: '',
        content: () => 'We designed a new way to interact with digital space. We’ve named the interface Flowwer. Explore, grow, and flow info. , guided by a seamless flow of information. This design is innate to human observation and learns from your choices. With the Flowwer we will navigate unchartered dimensions.',
        path: '/interface',
        paralax: 0,
        bgUrl: bg3,
    },
]

const Story = [
    {
        h1: 'Story',
        h2: '',
        content: () => 'We are the story. More now than ever, we can transcend our organic self however we choose. The future in our hands, the past in our pocket; it’s always sunny in VR if you want it to be. Live without limits.',
        path: '/story',
        paralax: 0,
        bgUrl: bg2,
    },
]



/************************************

    Business

************************************/



const Business = [
    {
        h1: 'Business',
        h2: '',
        content: () => 'We provide access to advanced technologies and advise on related markets. Our work includes creating technical specifications, sourcing development and managing project execution. Through primary research and academic relationships, we keep you ahead of the curve and beyond your competition. We provide access.',
        path: '/business',
        paralax: 0,
        bgUrl: bg1,
    },
]

const Services = [
    {
        h1: 'Services',
        h2: '',
        content: () => 'As pioneers our duty is to explore new media, publish our findings and map routes to follow. We explore beyond ambit reality. The fringe of technology is full of ethical complexities and it is our responsibility to set a high moral standard for the industry. We lead by example, challenge traditional structures and fight for underdogs. We Dream Awake',
        path: '/services',
        paralax: 0,
        bgUrl: bg2,
    },
]
const Philosophy = [
    {
        h1: 'Philosophy',
        h2: '',
        content: () => 'TBD',
        path: '/services',
        paralax: 0,
        bgUrl: bg1,
    },
]

const Disciplines = [
    {
        h1: 'Disciplines',
        h2: '',
        content: () => 'We design new media. Whether your are architecting a virtual world or executing a marketing campaign, we help you implement the latest technological breakthroughs, artfully.  We pride ourselves on a swift ability to design and execute. We will help you pilot the use of engines, software and design to“Extend Reality” (XR).',
        path: '/disciplines',
        paralax: 0,
        bgUrl: bg3,
    },
    {
        h1: '',
        h2: '',
        content: () => 'We will help you see further, move faster and achieve more.',
        path: '/disciplines',
        paralax: 100,
        bgUrl: bg3,
    },
]



/************************************

    Technology

************************************/


const Technology = [
    {
        h1: 'Technology',
        h2: '',
        content: () => 'XR will enhance our lives more than any media prior. However, this is only the beginning and we’re responsible for writing the future.',
        path: '/technology',
        paralax: 0,
        bgUrl: bg2,
    },
]
const VR = [
    {
        h1: 'Virtual Reality',
        h2: '',
        content: () => 'An emerging technology that empowers people to dream together. You will travel to places, and consider perspectives, you might otherwise not.   The possibilities are infinite.  Mirages into miracles.   Together, let’s architect new digital words, transcending time and space at will.',
        path: '/vr',
        paralax: 0,
        bgUrl: bg1,
    },
]
const AR = [
    {
        h1: 'Augmented Reality',
        h2: '',
        content: () => 'A advancement that will bring renaissance to computing. Your surrounding environment will feature all your smartphone amenities. AR let’s us blur the line of the physical and digital, weaving the internet into the fabric of life. AR will be a powerful tool to simplify complex ideas and democratize education.',
        path: '/ar',
        paralax: 0,
        bgUrl: bg3,
    },
]
const expTech = [
    {
        h1: 'Exponential Technology',
        h2: '',
        content: () => 'A medley of solutions from artificial intelligence to biometric softwares, robotics, drones, blockchain, cryptography, and other intense techs that are revolutionizing the world as we know it. We help you prepare plans, integrate strategies and drive the change you want to see in the world. ',
        path: '/expentional-technology',
        paralax: 0,
        bgUrl: bg1,
    },
]
const NYE = [
    {
        h1: 'New Years Eve',
        h2: '',
        content: () => 'Live from around the world, in stereoscopic 3D virtual reality, we will bring you to 10 iconic cities to celebrate with locals. All you need is the internet',
        path: '/nye',
        paralax: 0,
        bgUrl: bg2,
    },
    {
        h1: '',
        h2: 'Imagine',
        content: () => 'Teleporting (dreamscaping) from one city to another with the click of your controller. ',
        path: '/nye',
        paralax: 100,
        bgUrl: bg2,
    },
    {
        h1: '',
        h2: '',
        content: () => 'This New Year\'s Eve you can travel the globe without ever leaving your living room. Live, with friends and strangers alike, explore the world.',
        path: '/nye',
        paralax: 200,
        bgUrl: bg2,
    },
]




/************************************

    Slide assembly

************************************/


const designSlides = [
        Design,
        World,
        // Interface,
        // Story,
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

export default [
    designSlides,
    // businessSlides,
    // technologySlides,
]
