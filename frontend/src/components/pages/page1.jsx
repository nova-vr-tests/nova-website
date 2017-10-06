import React from 'react'


import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'

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

import philoLayer1 from '../img/business/philo-layer1.png'
import disciplinesLayer6 from '../img/business/disciplines-layer1.png'
import disciplinesLayer5 from '../img/business/disciplines-layer2.png'
import disciplinesLayer4 from '../img/business/disciplines-layer3.png'
import disciplinesLayer3 from '../img/business/disciplines-layer4.png'
import disciplinesLayer2 from '../img/business/disciplines-layer5.png'
import disciplinesLayer1 from '../img/business/disciplines-layer6.png'

import { styles as appStyles } from '../../constants.js'


/************************************

    DESIGN

************************************/


const designPid = Symbol()
const Design = [
    {
        h1: 'Design',
        h2: '',
        content: () => 'Gravity sculpts the physical world - creating complex beauty, masking great mystery and pulling us toward innovation. Through generations, we’ve arrived at a point at which we can experience a world that defies all forms of physics.',
        path: '/design',
        pid: designPid,
        layers: [
            {
                imgUrl: designIntro,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: '',
        content: () => <span>Limited only by the confines of our mind, XR tools afford us full control over which dimensions we visit and when. To maximize our benefit from these new virtual tools, we must build XR on these foundational elements: a <em>story</em>, a <em>world</em>, and an <em>interface</em>.</span>,
        path: '/design',
        pid: designPid,
        layers: [
            {
                imgUrl: designIntro,
                paralax: -30,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: '',
        content: () => <span>You play an important role in designing <em>tomorrow</em>. Together we will build your story, architect your world and design intuitive interactions with everything you develop.</span>,
        path: '/design',
        pid: designPid,
        layers: [
            {
                imgUrl: designIntro,
                paralax: -60,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: '',
        content: () => 'Join us in designing tomorrow.',
        path: '/design',
        pid: designPid,
        layers: [
            {
                imgUrl: designIntro,
                paralax: -90,
                opacity: 1,
            },
        ]
    },
]


const interfacePid = Symbol()
const Interface = [
    {
        h1: 'Design',
        h2: 'Interface',
        content: () => 'Information, volume, color, light, time, space, transparency... In XR, all these perceptions of the human experience are available at all times.',
        path: '/interface',
        pid: interfacePid,
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
        h1: 'Design',
        h2: 'Interface',
        content: () => 'We are redefining the grammar of interface to accommodate the era of multidimensional media. We are building interfaces that flow based on your attention and intentions.',
        path: '/interface',
        pid: interfacePid,
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
        h1: 'Design',
        h2: 'Interface',
        content: () => 'In XR you can zoom, scale, rotate, delete, cut and interact in all ways with all places at all times.',
        path: '/interface',
        pid: interfacePid,
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
    {
        h1: 'Design',
        h2: 'Interface',
        content: () => 'We simplify complex technologies through intuitive design.',
        path: '/interface',
        pid: interfacePid,
        layers: [
            {
                imgUrl: interfaceLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: interfaceLayer2,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: interfaceLayer3,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]

const storyPid = Symbol()
const Story = [
    {
        h1: 'Design',
        h2: 'Story',
        content: () => 'In XR you live the story.',
        path: '/story',
        pid: storyPid,
        layers: [
            {
                imgUrl: storyLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: storyLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        content: () => 'Choose your world.',
        path: '/story',
        pid: storyPid,
        layers: [
            {
                imgUrl: storyLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: storyLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer4,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        content: () => 'Our writers understand XR\'s technical intricacies and have the skills to adapt any scenario into an experience in Extended Reality.',
        path: '/story',
        pid: storyPid,
        layers: [
            {
                imgUrl: storyLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer3,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: storyLayer4,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        content: () => 'In XR you live the story.',
        path: '/story',
        pid: storyPid,
        layers: [
            {
                imgUrl: storyLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer3,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: storyLayer4,
                paralax: -50,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'Story',
        content: () => 'They will tell your story',
        path: '/story',
        pid: storyPid,
        layers: [
            {
                imgUrl: storyLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: storyLayer3,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: storyLayer4,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
]

const worldPid = Symbol()
const World = [
    {
        h1: 'Design',
        h2: 'World',
        content: () => 'XR marks a new era of exploration. When we first stepped into the virtual world it was open space - a dream in the making.',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: worldLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: worldLayer2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        content: () => 'We began to build. The potential was endless. We can build beyond physical world constraints.',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: worldLayer1,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: worldLayer2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Design',
        h2: 'World',
        content: () => 'We began to build. The potential was endless.We can build beyond physical world constraints.',
        path: '/world',
        pid: worldPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: worldLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: worldLayer2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]




/************************************

    Business

************************************/



const businessPid = Symbol()
const Business = [
    {
        h1: 'Business',
        h2: '',
        content: () => 'TBD',
        path: '/business',
        pid: businessPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const servicesPid = Symbol()
const Services = [
    {
        h1: 'Business',
        h2: 'Services',
        content: () => 'TBD',
        path: '/services',
        pid: servicesPid,
        layers: [
            {
                imgUrl: bg2,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const philoPid = Symbol()
const Philosophy = [
    {
        h1: 'Business',
        h2: 'Philosophy',
        content: () => 'TBD',
        path: '/philosophy',
        pid: philoPid,
        layers: [
            {
                imgUrl: philoLayer1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const disciplinesPid = Symbol()
const Disciplines = [
    {
        h1: 'Business',
        h2: 'Disciplines',
        content: () => 'TBD',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            {
                imgUrl: disciplinesLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer3,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer4,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer5,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer6,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        content: () => 'TBD',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            {
                imgUrl: disciplinesLayer1,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer2,
                paralax: -75,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer3,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer4,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer5,
                paralax: -150,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer6,
                paralax: -200,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        content: () => 'TBD',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            {
                imgUrl: disciplinesLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer2,
                paralax: -150,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer3,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer4,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer5,
                paralax: -300,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer6,
                paralax: -400,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Business',
        h2: 'Disciplines',
        content: () => 'TBD',
        path: '/disciplines',
        pid: disciplinesPid,
        layers: [
            {
                imgUrl: disciplinesLayer1,
                paralax: -150,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer2,
                paralax: -225,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer3,
                paralax: -300,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer4,
                paralax: -300,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer5,
                paralax: -500,
                opacity: 1,
            },
            {
                imgUrl: disciplinesLayer6,
                paralax: -600,
                opacity: 1,
            },
        ]
    },
]



/************************************

    Technology

************************************/


const techPid = Symbol()
const Technology = [
    {
        h1: 'Technology',
        h2: '',
        content: () => 'We use technology as an artist uses paint.',
        path: '/technology',
        pid: techPid,
        layers: [
            {
                imgUrl: technologyIntro,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: '',
        content: () => 'XR media promises to enhance our lives more than any media prior. We are embarking on a new frontier of connectivity.',
        path: '/technology',
        pid: techPid,
        layers: [
            {
                imgUrl: technologyIntro,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: '',
        content: () => 'We’re responsible for writing the future.',
        path: '/technology',
        pid: techPid,
        layers: [
            {
                imgUrl: technologyIntro,
                paralax: -200,
                opacity: 1,
            },
        ]
    },
]

const vrPid = Symbol()
const VR = [
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => 'Virtual Reality (VR) is an emerging technology empowering people to dream together. VR let\'s you go places you otherwise could not go. Together we architect new digital worlds while transcending time and space.',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => 'By putting on goggles and artificially stimulating our senses, our mind accept another version of reality, an entirely man made world.',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => <span>We can divide VR into two main categories: <br /> 1) High-fidelity: Ideal for creating premium experiences with positional tracking, haptic feedback and deep software integrations. Developing this caliber of content is a multi-year investment and project.</span>,
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 0,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => '2) Mobile. Ideal for quick replicas of real-world images, easy to consume, easy to distribute. Mobile VR will be a low-cost and accessible solution.',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer2,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => 'We are entering a new era of media and its standards are still being established.',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Virtual Reality',
        content: () => 'Nova XR helps you stay on the cutting edge of technology, by applying the latest computer sciences to your current strategies.',
        path: '/vr',
        pid: vrPid,
        theme: appStyles.themeTypes.noFooterTheme,
        layers: [
            {
                imgUrl: vrLayer1,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer2,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: vrLayer3,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer4,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer5,
                paralax: 0,
                opacity: 0,
            },
            {
                imgUrl: vrLayer6,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

const arPid = Symbol()
const AR = [
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => 'Augmented Reality (AR) is a powerful tool to simplify complex ideas and democratize education.',
        path: '/ar',
        pid: arPid,
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
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => 'AR is a technology that superimposes digital graphics on top of our physical environment. It is ideal for collaborative work or training.',
        path: '/ar',
        pid: arPid,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: -50,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => 'Through computer vision we can model the world around you. Turn everyday scenarios into interactive experinces.',
        path: '/ar',
        pid: arPid,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: -100,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => 'By weaving the internet into the fabric of life we must examine our traditional constructs of reality.',
        path: '/ar',
        pid: arPid,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -300,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: -150,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: -150,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Technology',
        h2: 'Augmented Reality',
        content: () => 'Nova XR will assist you in adapting the world to your workflow.',
        path: '/ar',
        pid: arPid,
        layers: [
            {
                imgUrl: arLayer1,
                paralax: -400,
                opacity: 1,
            },
            {
                imgUrl: arLayer2,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: arLayer3,
                paralax: -200,
                opacity: 1,
            },
        ]
    },
]

const expPid = Symbol()
const expTech = [
    {
        h1: 'Technology',
        h2: 'Exponential Technologies',
        content: () => 'TBD',
        path: '/expentional-technologies',
        pid: expPid,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
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

export default [
    designSlides,
    technologySlides,
    businessSlides,
]
