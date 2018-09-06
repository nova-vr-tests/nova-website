// @flow

import * as React from "react";

import {styles as appStyles} from "../../constants.js";

import Blog from "../Blog/Blog.jsx";
import BlogPostList from "../Blog/BlogPostList.jsx";
import API from "../../API.js";

import interfaceLayer1 from "../img/design/interface-layer1.png";
import interfaceLayer2 from "../img/design/interface-layer2.png";
import developBg from "../img/develop-bg.jpg";
import deployBg from "../img/deployBg.png";

import produceBg from "../img/bgs/produce.png";
import programBg from "../img/bgs/program.png";
import networkBg from "../img/bgs/network.png";

import type {ISlide, IPage} from "./types.jsx";

import {DevelopIntro} from "./page2Comps.jsx";
import * as websiteText from "./pageTexts.js";

/************************************

    Educational Portal

************************************/

let pid = Symbol();
let h1 = "Design";
let h2 = "";
let path = "/design";

const design: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <BlogPostList
        headerText={websiteText.page2.headers.design}
        fetchUrl={new API().urls.design.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.design.list} />,
    showNextSectionArrow: false,
    overrideHeader: true,
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
    ],
  },
];

pid = Symbol();
path = "/develop";
h1 = "Develop";
h2 = "Introduction";
const developIntro: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => <DevelopIntro />,
    paralax: 0,
    theme: appStyles.themeTypes.inverseTheme,
    layers: [
      {
        imgUrl: developBg,
        paralax: 0,
        opacity: 1,
      },
    ],
  },
];

h2 = "Program";
pid = Symbol();
path = "/program";
const program: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <BlogPostList
        headerText={websiteText.page2.headers.program}
        fetchUrl={new API().urls.program.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.program.list} />,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [
      {
        imgUrl: programBg,
        paralax: 0,
        opacity: 1,
      },
    ],
  },
];

h2 = "Produce";
pid = Symbol();
path = "/produce";
const produce: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <BlogPostList
        headerText={websiteText.page2.headers.produce}
        fetchUrl={new API().urls.produce.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.produce.list} />,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [
      {
        imgUrl: produceBg,
        paralax: 0,
        opacity: 1,
      },
    ],
  },
];

h2 = "Network";
pid = Symbol();
path = "/network";
const network: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <BlogPostList
        headerText={websiteText.page2.headers.network}
        fetchUrl={new API().urls.network.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.network.list} />,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [
      {
        imgUrl: networkBg,
        paralax: 0,
        opacity: 1,
      },
    ],
  },
];

h1 = "Deploy";
h2 = "";
pid = Symbol();
path = "/deploy";
const deploy: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <BlogPostList
        headerText={websiteText.page2.headers.deploy}
        fetchUrl={new API().urls.deploy.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.deploy.list} />,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [
      {
        imgUrl: deployBg,
        paralax: 0,
        opacity: 1,
      },
    ],
  },
];

/************************************

    Slide assembly

************************************/

const designSlides: Array<Array<ISlide>> = [design];

const developSlides = [developIntro, program, produce, network];

const deploySlides = [deploy];

const page2: IPage = [designSlides, developSlides, deploySlides];

export default page2;
