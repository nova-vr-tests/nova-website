// @flow

import {TOGGLE_SIDEBAR} from "../Sidebar";

import type {Action as SidebarAction, LinkState} from "../SidebarTypes.jsx";

import type {MenuInput} from "../../components/pages/types.jsx";

import store from "../../store.js";

const initSidebarLinkStates = (sections: MenuInput): SidebarAction => {
  const sidebarState: Array<LinkState> = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const subSections = section.links;

    sidebarState[i] = {
      isOpened: false,
      subSections: [],
    };

    for (let j = 0; j < subSections.length; j++) {
      sidebarState[i].subSections[j] = false;
    }
  }

  return {
    type: "sidebar/create_sidebar_state", // flow doesn't seem to work if type is from variable
    linkStates: sidebarState,
  };
};

const resetLinkStates = (_links: Array<LinkState>): Array<LinkState> => {
  const links: Array<LinkState> = JSON.parse(JSON.stringify(_links)); // object deep copy

  for (let i = 0; i < links.length; i++) {
    links[i].isOpened = false;

    for (let j = 0; j < links[i].subSections.length; j++) {
      links[i].subSections[j] = false;
    }
  }

  return links;
};

const toggleSidebarSection = (i: number): SidebarAction => {
  const currentLinkStates = [...store.getState().sidebarReducer.linkStates];
  const linkStates = resetLinkStates(currentLinkStates);

  if (!currentLinkStates[i].isOpened) {
    linkStates[i].isOpened = !currentLinkStates[i].isOpened;
  }

  return {
    type: "sidebar/toggle_sidebar_section", // flow doesn't recognize from variable
    linkStates,
  };
};

const toggleSidebarSubSection = (i: number, j: number): SidebarAction => {
  const currentLinkStates = [...store.getState().sidebarReducer.linkStates];
  const linkStates = resetLinkStates(currentLinkStates);

  linkStates[i].isOpened = currentLinkStates[i].isOpened;
  linkStates[i].subSections[j] = !currentLinkStates[i].subSections[j];

  return {
    type: "sidebar/toggle_sidebar_subsection", // flow doesn't recognize from variable
    linkStates,
  };
};

const toggleSidebar = (): SidebarAction => ({
  type: TOGGLE_SIDEBAR,
});

export {
  toggleSidebar,
  initSidebarLinkStates,
  toggleSidebarSection,
  toggleSidebarSubSection,
};
