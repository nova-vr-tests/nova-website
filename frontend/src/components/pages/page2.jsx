// @flow

import * as React from 'react'

import bg1 from '../img/design/1.png'

import { styles as appStyles } from '../../constants.js'

import Blog from '../Blog/Blog.jsx'
import BlogPostList from '../Blog/BlogPostList.jsx'
import API from '../../API.js'

import interfaceLayer1 from '../img/design/interface-layer1.png'
import interfaceLayer2 from '../img/design/interface-layer2.png'
import developBg from '../img/develop-bg.jpg'
import deployBg from '../img/deployBg.png'

import type { ISlide, IPage } from './types.jsx'

/************************************

    Educational Portal

************************************/

let pid = Symbol()
let h1 = 'Design'
let h2 = ''
let path = '/design'


const design: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                headerText={ `Design :)` }
                fetchUrl={ new API().urls.design.list } />,
        mainPanelContent: () =>
            <Blog fetchUrl={ new API().urls.design.list } />,
        paralax: 0,
        theme: appStyles.themeTypes.inverseTheme,
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
        ]
    },
]

pid = Symbol()
path = '/develop'
h1 = 'Develop'
h2 = 'Introduction'
const developIntro: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () => <div>Develop</div>,
        paralax: 0,
        theme: appStyles.themeTypes.inverseTheme,
        layers: [
            {
                imgUrl: developBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]


h2 = 'Program'
pid = Symbol()
path = '/program'
const program: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                fetchUrl={
                    new API().urls.program.list } />,
        mainPanelContent: () =>
            <Blog
                fetchUrl={
                    new API().urls.program.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]



h2 = 'Produce'
pid = Symbol()
path = '/produce'
const produce: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                fetchUrl={
                    new API().urls.produce.list } />,
        mainPanelContent: () =>
            <Blog
                fetchUrl={
                    new API().urls.produce.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

h2 = 'Network'
pid = Symbol()
path = '/network'
const network: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                fetchUrl={
                    new API().urls.network.list } />,
        mainPanelContent: () =>
            <Blog
                fetchUrl={
                    new API().urls.network.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: bg1,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]



h1 = 'Deploy'
h2 = ''
pid = Symbol()
path = '/deploy'
const deploy: Array<ISlide> = [
    {
        h1,
        h2,
        path,
        pid,
        content: () =>
            <BlogPostList
                fetchUrl={
                    new API().urls.deploy.list } />,
        mainPanelContent: () =>
            <Blog
                fetchUrl={
                    new API().urls.deploy.list } />,
        showNextSectionArrow: false,
        layers: [
            {
                imgUrl: deployBg,
                paralax: 0,
                opacity: 1,
            },
        ]
    },
]

/************************************

    Slide assembly

************************************/


const designSlides: Array<Array<ISlide>> = [
    design,
]

const developSlides = [
    developIntro,
    program,
    produce,
    network,
]

const deploySlides = [
    deploy,
]

const page2: IPage = [
    designSlides,
    developSlides,
    deploySlides,
]

export default page2
