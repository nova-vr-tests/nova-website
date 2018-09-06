// @flow

import * as React from "react";

import intro from "../img/home.png";

import productsBg from "../img/products.jpg";
import publicationsBg from "../img/publicationsBg.png";

import consultationBg from "../img/bgs/consultation-intro.jpeg";
import industryBg from "../img/bgs/industry.jpeg";
import learningLabBg from "../img/bgs/learning-lab.png";

import {styles as appStyles} from "../../constants.js";

import Blog from "../Blog/Blog.jsx";
import BlogPostList from "../Blog/BlogPostList.jsx";
import ProductsList, {ProtectedProduct} from "../Products/Products.jsx";
import API from "../../API.js";

import {HomePage, ConsultationIntro} from "./page1Comps.jsx";

import type {ISlide, IPage} from "./types.jsx";

const createLayer = (imgUrl, paralax, opacity) => ({imgUrl, paralax, opacity});

import * as websiteText from "./pageTexts.js";
/************************************

    SITE INTRO

************************************/

let h1 = "";
let h2 = "";
let path = "/";
let pid = Symbol();
const SiteIntro: Array<ISlide> = [
  {
    h1,
    h2,
    content: () => <HomePage />,
    overrideMainPanel: true,
    overrideHeader: true,
    showNextSectionArrow: false,
    path,
    pid,
    linePosition: 0,
    layers: [createLayer(intro, 0, 1)],
  },
];

/************************************

   Props

 ***********************************/

pid = Symbol("business props");
h1 = "Partnership Portal";
h2 = "";
path = "/business-props";
const BusinessProps: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => (
      <ProtectedProduct
        clientUrl="business-props"
        fetchUrl={new API().urls.businessProps.list}
      />
    ),
    overrideMainPanel: true,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [createLayer(productsBg, 0, 1)],
  },
];

/************************************

Products

***********************************/

pid = Symbol("products");
h1 = "Products";
h2 = "";
path = "/products";
const Products: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => <ProductsList fetchUrl={new API().urls.products.list} />,
    overrideMainPanel: true,
    overrideHeader: true,
    showNextSectionArrow: false,
    layers: [createLayer(productsBg, 0, 1)],
  },
];

h1 = "Consultation";
h2 = "Introduction";
path = "/services";
pid = Symbol();
const consultationIntro: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    content: () => <ConsultationIntro />,
    layers: [createLayer(consultationBg, 0, 1)],
  },
];

h2 = "Industry";
pid = Symbol();
path = "/industry";
const industry: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    showNextSectionArrow: false,
    content: () => (
      <BlogPostList
        headerText={websiteText.page1.headerTexts.industry}
        fetchUrl={new API().urls.industries.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.industries.list} />,
    layers: [createLayer(industryBg, 0, 1)],
    overrideHeader: true,
  },
];

pid = Symbol();
path = "/cross-industry"; // to differentiate from /partnership-productions
h2 = "Cross Industry";
const crossIndustry: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    showNextSectionArrow: false,
    content: () => (
      <BlogPostList
        headerText={websiteText.page1.headerTexts.crossIndustry}
        fetchUrl={new API().urls.crossIndustry.list}
      />
    ),
    mainPanelContent: () => (
      <Blog fetchUrl={new API().urls.crossIndustry.list} />
    ),
    theme: appStyles.themeTypes.noFooterTheme,
    overrideHeader: true,
    layers: [createLayer(industryBg, 0, 1)],
  },
];

pid = Symbol();
path = "/learning-lab"; // to differentiate from /partnership-productions
h2 = "Leaning Lab";
const learningLab: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    showNextSectionArrow: false,
    content: () => (
      <BlogPostList
        headerText={websiteText.page1.headerTexts.learningLab}
        fetchUrl={new API().urls.learningLab.list}
      />
    ),
    mainPanelContent: () => <Blog fetchUrl={new API().urls.learningLab.list} />,
    theme: appStyles.themeTypes.noFooterTheme,
    overrideHeader: true,
    layers: [createLayer(learningLabBg, 0, 1)],
  },
];

/************************************

    Business

************************************/

pid = Symbol();
h1 = "Publications";
h2 = "";
path = "/publications";

const Publications: Array<ISlide> = [
  {
    h1,
    h2,
    path,
    pid,
    showNextSectionArrow: false,
    overrideHeader: true,
    content: () => (
      <BlogPostList
        headerText={websiteText.page1.headerTexts.publications}
        fetchUrl={new API().urls.publications.list}
      />
    ),
    mainPanelContent: () => (
      <Blog fetchUrl={new API().urls.publications.list} />
    ),
    layers: [createLayer(publicationsBg, 0, 1)],
  },
];

/************************************

    Slide assembly

************************************/

const productSlides = [Products];

const consultationSlides = [
  consultationIntro,
  industry,
  crossIndustry,
  learningLab,
];

const publicationSlides = [Publications];

const page1: IPage = [productSlides, consultationSlides, publicationSlides];

export default page1;

export {SiteIntro, BusinessProps};
