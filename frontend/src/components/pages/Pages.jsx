// @flow

import * as React from "react";
import Presentation from "../Presentation/Presentation.jsx";
import transitions from "../Presentation/transitions.js";

import novaXr, {Products, Comp404, SiteIntro, BusinessProps} from "./page1.jsx";
import resources from "./page2.jsx";
import partnership from "./page3.jsx";

import {alignments} from "./UI.jsx";

import {styles as appStyles} from "../../constants.js";
import API from "../../API.js";
import BlogPostList from "../Blog/BlogPostList.jsx";
import Blog from "../Blog/Blog.jsx";

import type {
  IPage,
  ISlide,
  IMenuSection,
  IMakeMenuOutput,
  IFlatten,
} from "./types.jsx";

import type {Page as IPresentationSlide} from "../Presentation/PresentationTypes.jsx";

import type {TransitionTypes as BgTransitionTypes} from "../Presentation/transitionTypes.jsx";

// Menu Section and subsection titles
const category1: IMenuSection = {
  title: "Solutions",
  links: [
    {
      title: "Products",
    },
    {
      title: "Consultation",
    },
    {
      title: "Publications",
    },
  ],
};

const category2: IMenuSection = {
  title: "Services",
  links: [
    {
      title: "Design",
    },
    {
      title: "Develop",
    },
    {
      title: "Deploy",
    },
  ],
};

const category3: IMenuSection = {
  title: "Nova XR",
  links: [
    {
      title: "Who we are",
    },
    {
      title: "Partnership",
    },
    {
      title: "Find us",
    },
  ],
};

// Structure containing menu section and subsection titles
const menuLinks: Array<IMenuSection> = [category1, category2, category3];

/**
   Get menu subsubsection link paths from pages
*/
const getMenuLinks = (section: IPage) => {
  return section.map(subSection =>
    subSection.map(presentation => presentation[0].path),
  );
};

// Create menu component input structure with all (sub(sub))section links and titles
const makeMenu = (section: IPage, i: number): IMakeMenuOutput => {
  const links = section.map((subsection, j) => {
    const subLinks = subsection.map(presentation => {
      return {
        links: presentation[0].h2,
        paths: presentation[0].path,
      };
    });

    return {
      title: menuLinks[i].links[j].title,
      links: subLinks.map(e => e.links),
      paths: subLinks.map(e => e.paths),
    };
  });

  return {
    title: menuLinks[i].title,
    links: links,
  };
};

/**
   Returns a slide linked to surrounding slides with appropriate transitions
*/
const makePresentationSlide = (slide: ISlide): IPresentationSlide => {
  const Text = slide.content || (() => <div />);
  const {
    pid,
    path,
    linePosition,
    layers,
    h1,
    h2,
    align,
    mainPanelContent,
    showNextSectionArrow,
    overrideMainPanel,
    overrideHeader,
  } = slide;

  const comp = () => <Text />;

  // Default transitions
  let nextSlideTransition: BgTransitionTypes = transitions.types.BG_SPLIT;
  let previousSlideTransition: BgTransitionTypes = transitions.types.BG_SPLIT;

  return {
    comp,
    pid,
    path,
    h1,
    h2,
    showNextSectionArrow: showNextSectionArrow === undefined ? true : false,
    linePosition: linePosition ? linePosition : 0,
    layers,
    mainPanelContent,
    overrideMainPanel: overrideMainPanel ? overrideMainPanel : false,
    overrideHeader: overrideHeader ? overrideHeader : false,
    align: align ? align : alignments.left,
    theme: appStyles.themeTypes.defaultTheme,
    transitions: {
      nextSlide: {
        bg: nextSlideTransition,
      },
      previousSlide: {
        bg: previousSlideTransition,
      },
    },
  };
};

/**
  Dark magic functional prog, flattens an array
*/
const flatten: IFlatten = arr =>
  ((flat = [].concat(...arr)) =>
    flat.some(Array.isArray) ? flatten(flat) : flat)();

/**
   Site input. From this structure is infered:
   - urls
   - menu links and title
   - slide transitions
*/
const sitePages: Array<IPage> = [novaXr, resources, partnership];

// Store all site paths in flat array
const routeUrls = sitePages.map(getMenuLinks);

/**
   Adds line height to each slide based on where it is in sitePages
*/
const pages = sitePages.map((section, i) =>
  section.map(subsection =>
    subsection.map(presentation =>
      presentation.map(slide => ({
        ...slide,
        linePosition: i,
      })),
    ),
  ),
);

// Creating menu from page array structure
const menuInput = pages.map(makeMenu);

// Now that site structure was infered from slide array nesting structure, we can flatten the slides array. This will be the presentation input
let slides: Array<ISlide> = flatten(pages);

// Adding site root before all other slides
slides = [...SiteIntro, ...Comp404, ...BusinessProps, ...slides];

class Page extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const getPages = async () => {
  console.log("asdf");
  // update pages in redux state for BG to have access to
  const sectionList = await new API().fetchSections();
  console.log(sectionList);
  const createLayer = (imgUrl, paralax, opacity) => ({
    imgUrl,
    paralax,
    opacity,
  });
  console.log("reducing");
  const pages = sectionList
    .reduce(
      (acc, s) => [
        ...acc,
        ...s.subsection_set.map(s2 => ({...s2, section: s.title})),
      ],
      [],
    )
    .map(s => ({
      h1: s.section,
      h2: s.title,
      path: `/` + s.url,
      pid: Symbol(),
      comp: () => (
        <BlogPostList
          headerText={s.introduction}
          fetchUrl={`subsections/${s.id}/`}
        />
      ),
      mainPanelContent: Page,
      layers: [createLayer(s.background_image, 0, 1)],
      overrideHeader: true,
      overrideMainPanel: false,
      mainPanelContent: () => <Blog fetchUrl={"pages/"} />,
    }));
  console.log([...SiteIntro, ...pages]);

  return [
    ...[...SiteIntro, ...Comp404, ...Products].map(makePresentationSlide),
    ...pages,
  ];
};

const _Pages = () => {};

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    };
  }
  async componentWillMount() {
    const pages = await getPages();
    this.setState({pages});
  }
  render() {
    if (!this.state.pages.length) return <div />;

    return <Presentation pages={this.state.pages} />;
  }
}

export default Pages;

export {routeUrls, menuLinks, menuInput, slides};
