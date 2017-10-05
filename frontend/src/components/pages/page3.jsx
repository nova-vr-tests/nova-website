import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'

import nyeLayer1 from '../img/partnership/nye/nye-layer1.png'
import nyeLayer2 from '../img/partnership/nye/nye-layer2.png'
import nyeLayer3 from '../img/partnership/nye/nye-layer3.png'

/************************************

    NYE

************************************/


const Nye = [
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => '',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: 0,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => '2',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: -50,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: -200,
                opacity: 1,
            },
        ]
    },
    {
        h1: 'Partnership',
        h2: 'New Year\'s Eve',
        content: () => ' last',
        path: '/nye',
        bgUrl: nyeLayer1,
        layers: [
            {
                imgUrl: nyeLayer1,
                paralax: -100,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer2,
                paralax: -200,
                opacity: 1,
            },
            {
                imgUrl: nyeLayer3,
                paralax: -400,
                opacity: 1,
            },
        ]
    },
]



/************************************

    Slide assembly

************************************/


const nyeSlides = [
    Nye,
]

export default [
    nyeSlides,
]
