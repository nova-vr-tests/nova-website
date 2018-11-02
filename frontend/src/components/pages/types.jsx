// @flow

import * as React from "react";

import type {ThemeNames} from "../../constantTypes.jsx";

// Bg layer geometry
// Should be moved to Bg component
export type IBgLayer = {
  imgUrl: string,
  paralax: number,
  opacity: number,
};

// Data structure for page creation
export type ISlide = {
  h1: string,
  h2: string,
  content: React.StatelessFunctionalComponent<{}>,
  path: string,
  layers: Array<IBgLayer>,
  pid: any, // Symbols not supported by flow
  linePosition?: number,
  align?: string,
  theme?: ThemeNames,
};

// All presentation slides under a menu section
export type IPage = Array<Array<Array<ISlide>>>;

// Menu sub section titles
type IMenuSubsection = {
  title: string,
};

// Menu section titles; used to produce menu comp input when used in conjunction with Array<IPage>
export type IMenuSection = {
  title: string,
  links: Array<IMenuSubsection>,
};

// Menu subsection titles and links
// Should be moved to Sidebar types
export type ILink = {
  title: string,
  links: Array<string>,
  paths: Array<string>,
};

// Input of menu component
// Should be moved to Sidebar types
export type IMakeMenuOutput = {
  title: string,
  links: Array<ILink>,
};

export type MenuSectionState = IMakeMenuOutput;

export type MenuInput = Array<MenuSectionState>;

export type IFlatten = (Array<any>) => Array<any>;
