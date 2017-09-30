import React from 'react'

import Presentation from '../../Presentation/Presentation.jsx'
import transitions from '../../Presentation/transitions.js'

import {
    P,
    H1,
    H2,
    PageWrapper,
} from '../UI.jsx'

import bg1 from '../../img/design/1.png'
import bg2 from '../../img/design/2.png'
import bg3 from '../../img/design/3.png'

const DesignIntro = props => {
    return (
        <PageWrapper>
            <H1>Intro</H1>
            <P>
                Hey all
            </P>
        </PageWrapper>
    )
}

const World1 = props => {
    return (
        <PageWrapper>
            <H1>World 1</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const World2 = props => {
    return (
        <PageWrapper>
            <H1>World 2</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const World3 = props => {
    return (
        <PageWrapper>
            <H1>World 3</H1>
            <P>
                When we first stepped into the virtual world it was open space. It felt like a dream in the making. The restrictions here are none. When knowledge seems elusive, come to an infinite source of awareness. The next step for curiosity.
            </P>
        </PageWrapper>
    )
}

const Interface = props => {
    return (
        <PageWrapper>
            <H1>Interface 1</H1>
            <P>
                We created a means of interaction and called it the flower. It’s not a thing to see but rather a place to arrive. It’s a symbol of exploration and the result of curiosity. It the source which allows us to flourish as we plunge further and design more of this new dimension.
            </P>
        </PageWrapper>
    )
}

const Story = props => {
    return (
        <PageWrapper>
            <H1>Story 1</H1>
            <P>
                For too long we’ve been passive viewers of media. In front of screens we’ve sat and watched as the very few write the story of the past and present. But our future holds something revolutionary - a place where each of our decisions cause recognizable results. We’re walking into a world where we create our own story and feel it unfold.
            </P>
        </PageWrapper>
    )
}

const makePresentationSlide = (slide, i, slides) => {
    const Text = slide.content
    const { bgUrl, path, paralax } = slide

    const comp = props => (
        <PageWrapper>
            <H1>{ slide.h1 }</H1>
            <H2>{ slide.h2 }</H2>
            <P>
                <Text />
            </P>
        </PageWrapper>
    )

    // Default transitions
    let nextSlideTransition = transitions.types.BG_SPLIT
    let previousSlideTransition = transitions.types.BG_SPLIT

    if(i === 0) {
        // Border conditions
        previousSlideTransition = -1

        // Check next slide
        if(bgUrl === slides[i + 1].bgUrl)
            nextSlideTransition = transitions.types.BG_PARALAX

    } else if(i === slides.length - 1) {
        // Border conditions
        nextSlideTransition = -1

        // Check previous slide
        if(bgUrl === slides[i - 1].bgUrl)
            previousSlideTransition = transitions.types.BG_PARALAX

    } else {
        // Compare next slide bgUrl
        if(bgUrl === slides[i + 1].bgUrl)
            nextSlideTransition = transitions.types.BG_PARALAX

        // Compare previous slide bgUrl
        if(bgUrl === slides[i - 1].bgUrl)
            previousSlideTransition = transitions.types.BG_PARALAX

    }



    return {
        comp,
        bgUrl,
        path,
        paralax,
        transitions: {
            nextSlide: {
                bg: nextSlideTransition,
            },
            previousSlide: {
                bg: previousSlideTransition,
            }
        }
    }
}

const slides = [
    {
        h1: 'Design',
        h2: '',
        content: () => 'The physical world has been a masterful designer. It is infinite in beauty and complexity, veiling mysteries and provoking our wonder. Inexplicable yet endlessly enchanting.  The quest for knowledge and understanding never gets dull, and these unanswerable questions keep pulling us forward.  We are only limited by our imaginations.',
        path: '/design',
        paralax: 0,
        bgUrl: bg1,
    },
    {
        h1: 'World',
        h2: '',
        content: () => 'What more is there? You’ll soon wonder which was a digital world and which was a dream. Jump into the light. There are no limits. When knowhow grows elusive, look to the sky.  The more you know the more amazing the would seems. The',
        path: '/world',
        paralax: 0,
        bgUrl: bg2,
    },
    {
        h1: 'Interface',
        h2: '',
        content: () => 'We designed a new way to interact with digital space. We’ve named the interface Flowwer. Explore, grow, and flow info. , guided by a seamless flow of information. This design is innate to human observation and learns from your choices. With the Flowwer we will navigate unchartered dimensions.',
        path: '/interface',
        paralax: 0,
        bgUrl: bg3,
    },
    {
        h1: 'Story',
        h2: '',
        content: () => 'We are the story. More now than ever, we can transcend our organic self however we choose. The future in our hands, the past in our pocket; it’s always sunny in VR if you want it to be. Live without limits.',
        path: '/story',
        paralax: 0,
        bgUrl: bg2,
    },
    {
        h1: 'Business',
        h2: '',
        content: () => 'We provide access to advanced technologies and advise on related markets. Our work includes creating technical specifications, sourcing development and managing project execution. Through primary research and academic relationships, we keep you ahead of the curve and beyond your competition. We provide access.',
        path: '/business',
        paralax: 0,
        bgUrl: bg1,
    },
    {
        h1: 'Services',
        h2: '',
        content: () => 'As pioneers our duty is to explore new media, publish our findings and map routes to follow. We explore beyond ambit reality. The fringe of technology is full of ethical complexities and it is our responsibility to set a high moral standard for the industry. We lead by example, challenge traditional structures and fight for underdogs. We Dream Awake',
        path: '/services',
        paralax: 0,
        bgUrl: bg2,
    },
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
    {
        h1: 'Technology',
        h2: '',
        content: () => 'XR will enhance our lives more than any media prior. However, this is only the beginning and we’re responsible for writing the future.',
        path: '/technology',
        paralax: 0,
        bgUrl: bg2,
    },
    {
        h1: 'Virtual Reality',
        h2: '',
        content: () => 'An emerging technology that empowers people to dream together. You will travel to places, and consider perspectives, you might otherwise not.   The possibilities are infinite.  Mirages into miracles.   Together, let’s architect new digital words, transcending time and space at will.',
        path: '/vr',
        paralax: 0,
        bgUrl: bg1,
    },
    {
        h1: 'Augmented Reality',
        h2: '',
        content: () => 'A advancement that will bring renaissance to computing. Your surrounding environment will feature all your smartphone amenities. AR let’s us blur the line of the physical and digital, weaving the internet into the fabric of life. AR will be a powerful tool to simplify complex ideas and democratize education.',
        path: '/ar',
        paralax: 0,
        bgUrl: bg3,
    },
    {
        h1: 'Exponential Technology',
        h2: '',
        content: () => 'A medley of solutions from artificial intelligence to biometric softwares, robotics, drones, blockchain, cryptography, and other intense techs that are revolutionizing the world as we know it. We help you prepare plans, integrate strategies and drive the change you want to see in the world. ',
        path: '/expentional-technology',
        paralax: 0,
        bgUrl: bg1,
    },
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

const DesignPresentation = props => {
    return (
        <Presentation
            pages={ slides.map(makePresentationSlide) } />
    )
}

export {
    DesignPresentation,
    World1,
    World2,
    Interface,
    Story,
}
