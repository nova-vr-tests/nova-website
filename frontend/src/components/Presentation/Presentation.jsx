// @flow

import * as React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";

import MainPanel from "../MainPanel/MainPanel.jsx";

import {
  updateBackLayers,
  updateTransitionProgress,
} from "../../reducer/actions/Bg.js";

import {setupSEOTags} from "../../helpers.js";

import {
  updateLinePosition,
  updateAppTheme,
  updateCurrentPage,
  updateGoToPage,
  updatePages,
  updateMainPanelContent,
  updateMainPanelIsOpened,
  updateSidePanelHeaderOverride,
} from "../../reducer/actions/App.js";

import transitions from "./transitions.js";

import SidePanel, {sidePanelTypes} from "./SidePanel/SidePanel.jsx";
import getStyles from "./PresentationStyles.jsx";

import SlideTransition from "./SlideTransition/SlideTransition.jsx";

import type {
  ReduxState,
  ReduxDispatch,
  OwnProps,
  Props,
  State,
  Page,
} from "./PresentationTypes.jsx";

import type {MapStateToProps, MapDispatchToProps} from "../../storeTypes.jsx";

import type {TransitionTypes} from "./transitionTypes.jsx";

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
  return {
    pathname: state.routing.location.pathname,
    appTheme: state.appReducer.appTheme,
    currentPage: state.appReducer.currentPage,
    windowWidth: state.appReducer.windowWidth,
    isFooterOpened: state.appReducer.isFooterOpened,
    goToPage: state.appReducer.goToPage,
    linePosition: state.appReducer.linePosition,
    isSidePanelOpened: state.appReducer.isSidePanelOpened,
    isMainPanelOpened: state.appReducer.mainPanel.isOpened,
    mainPanelContent: state.appReducer.mainPanel.content,
  };
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(
  dispatch,
) {
  return {
    updateTransitionProgress: p => dispatch(updateTransitionProgress(p)),
    updateBackLayers: (l, pid) => dispatch(updateBackLayers(l, pid)),
    goTo: url => dispatch(push(url)),
    updateLinePosition: position => dispatch(updateLinePosition(position)),
    updateAppTheme: appTheme => dispatch(updateAppTheme(appTheme)),
    updateCurrentPage: currentPage => dispatch(updateCurrentPage(currentPage)),
    updateGoToPage: goToPage => dispatch(updateGoToPage(goToPage)),
    updatePages: pages => dispatch(updatePages(pages)),
    updateMainPanelIsOpened: isOpened =>
      dispatch(updateMainPanelIsOpened(isOpened)),
    updateMainPanelContent: content =>
      dispatch(updateMainPanelContent(content)),
    updateSidePanelHeaderOverride: overrideHeader =>
      dispatch(updateSidePanelHeaderOverride(overrideHeader)),
  };
};

/**
   - Combines slides of same presentation into paragraph for side panel
   - Shows table of content and highlights current link
*/
const PresentationDumb: React.StatelessFunctionalComponent<Props> = props => {
  const styles = getStyles(props);

  return (
    <div style={styles.wrapper}>
      <MainPanel
        isOpened={props.isMainPanelOpened}
        Content={props.mainPanelContent}
      />

      <div style={styles.sidePanel}>
        <SidePanel type={sidePanelTypes.DEFAULT}>
          <SlideTransition
            pathname={props.pathname}
            windowWidth={props.windowWidth}
            resetScrollEvent={props.resetScrollEvent}
            appTheme={props.appTheme}
            currentPage={props.currentPage}
            pages={props.pages}
            linePosition={props.linePosition}
            scrollEvent={props.scrollEvent}
            isMainPanelOpened={props.isMainPanelOpened}
          />
        </SidePanel>
      </div>
    </div>
  );
};

/**
   - Updates line position on slide change
   - Scroll activated slide change
   - URL updates on mount and slide change
   - Presentation pages
   - Position in the presentation (page number)
   - Slide change only happens on click
*/
class Presentation extends React.Component<Props, State> {
  static defaultProps = {
    attachToMouseScroll: true,
  };

  eventCounter: number;
  onScroll: (e: {deltaY: number}) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  attachScrollEvent: () => void;
  detachScrollEvent: () => void;
  isLastPage: () => void;
  isFirstPage: () => void;
  pathnameToSlideNumber: (pathname: string) => number;
  goToPage: (page: number) => void;
  updateSlideFromUrl: (nextPathname: string) => void;
  getTransitionType: (
    currentPage: number,
    targetPage: number,
  ) => TransitionTypes;
  updateLinePosition: (props?: Props) => void;
  resetScrollEvent: () => void;
  updateMainPanel: ({pages: Array<Page>, currentPage: number}) => void;
  updateSlideHeaderOverride: Props => void;
  updateAppTheme: (currentPage: number) => void;

  constructor(props: Props) {
    super(props);

    const currentPage = this.pathnameToSlideNumber(this.props.pathname);
    this.props.updateCurrentPage(currentPage);

    this.props.updateBackLayers(
      this.props.pages[currentPage].layers,
      this.props.pages[currentPage].pid,
    );

    this.updateAppTheme(currentPage);

    this.eventCounter = 0;
    this.onScroll = this.onScroll.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.attachScrollEvent = this.attachScrollEvent.bind(this);
    this.detachScrollEvent = this.detachScrollEvent.bind(this);
    this.isFirstPage = this.isFirstPage.bind(this);
    this.isLastPage = this.isLastPage.bind(this);
    this.pathnameToSlideNumber = this.pathnameToSlideNumber.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.updateSlideFromUrl = this.updateSlideFromUrl.bind(this);
    this.getTransitionType = this.getTransitionType.bind(this);
    this.updateLinePosition = this.updateLinePosition.bind(this);
    this.resetScrollEvent = this.resetScrollEvent.bind(this);
    this.updateMainPanel = this.updateMainPanel.bind(this);
    this.updateSlideHeaderOverride = this.updateSlideHeaderOverride.bind(this);

    // Update redux goToPage function
    this.props.updateGoToPage(this.goToPage);

    this.state = {
      scrollEvent: null,
    };

    this.props.updateMainPanelIsOpened(true);
  }

  componentDidMount() {
    // update pages in redux state for BG to have access to
    this.props.updatePages(this.props.pages);
    // Attach scroll to page change
    this.attachScrollEvent();

    // Deal with urls

    this.updateLinePosition();
  }

  componentWillUnmount() {
    this.detachScrollEvent();
  }

  componentWillUpdate(nextProps: Props) {
    // Let footer update app theme when openeing but handle it from here when it closes
    if (!nextProps.isFooterOpened) {
      // update app theme on current page state update
      this.updateAppTheme(nextProps.currentPage);
    }
  }

  componentDidUpdate() {
    if (this.state.scrollEvent) {
      this.resetScrollEvent();
    }
  }

  resetScrollEvent() {
    this.setState({scrollEvent: null});
  }

  updateAppTheme(currentPage: number) {
    this.props.updateAppTheme(this.props.pages[currentPage].theme);
  }

  pathnameToSlideNumber(pathname: string) {
    if (pathname === "/") {
      return 0;
    }

    const COMP_404_INDEX = 1; // Pages.jsx 229:30

    return (
      this.props.pages
        .map((e, i) => (pathname === e.path ? i : -1))
        .filter(e => e >= 0)[0] || COMP_404_INDEX
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextPathname = nextProps.pathname;
    this.updateSlideFromUrl(nextPathname);

    this.updateLinePosition(nextProps);

    if (this.props.currentPage !== nextProps.currentPage) {
      this.updateMainPanel(nextProps);
    }

    if (
      this.props.currentPage !== nextProps.currentPage &&
      window.location.search === ""
    ) {
      const {h1, layers} = nextProps.pages[nextProps.currentPage];
      setupSEOTags(
        h1,
        window.location.href,
        window.location.origin + layers[0].imgUrl,
      );
    } else if (nextProps.pathname === "/") {
      const {h1, layers} = nextProps.pages[nextProps.currentPage];
      setupSEOTags(
        h1,
        window.location.href,
        window.location.origin + layers[0].imgUrl,
      );
    }

    this.updateSlideHeaderOverride(nextProps);
  }

  updateSlideHeaderOverride(nextProps: Props) {
    this.props.updateSidePanelHeaderOverride(
      nextProps.pages[nextProps.currentPage].overrideHeader,
    );
  }

  updateMainPanel({
    pages,
    currentPage,
  }: {
    pages: Array<Page>,
    currentPage: number,
  }) {
    if (!pages[currentPage].overrideMainPanel) {
      if (pages[currentPage].mainPanelContent) {
        this.props.updateMainPanelContent(pages[currentPage].mainPanelContent);

        this.props.updateMainPanelIsOpened(false);
      } else {
        this.props.updateMainPanelIsOpened(false);
      }
    }
  }

  updateSlideFromUrl(nextPathname: string) {
    const currentPathname = this.props.pathname;

    if (currentPathname !== nextPathname) {
      let nextSlide = this.pathnameToSlideNumber(nextPathname);

      this.goToPage(nextSlide);
    }
  }

  /**
       Returns bg transition function between 2 slides
    */
  getTransitionType(currentPage: number, targetPage: number) {
    if (
      this.props.pages[currentPage].pid === this.props.pages[targetPage].pid
    ) {
      return transitions.types.BG_PARALAX;
    } else {
      return transitions.types.BG_SPLIT;
    }
  }

  updateLinePosition(props: Props = this.props) {
    this.props.updateLinePosition(props.pages[props.currentPage].linePosition);
  }

  goToPage(targetPage: number) {
    const {currentPage} = this.props;

    this.updateLinePosition(this.props);

    if (targetPage !== currentPage) {
      this.props.updateCurrentPage(targetPage);
    }
  }

  /*
       Returns true if currentPage is first page in pages array
    **/
  isFirstPage() {
    return this.props.currentPage === 0 ? true : false;
  }

  /*
       Returns true if currentPage is last page in pages array
    **/
  isLastPage() {
    return this.props.currentPage === this.props.pages.length - 1
      ? true
      : false;
  }

  /*
       Goes to next slide
    **/
  goToNextPage() {
    return this.goToPage(this.props.currentPage + 1);
  }

  /*
       Goes to previous slide
    **/
  goToPreviousPage() {
    return this.goToPage(this.props.currentPage - 1);
  }

  /*
       Attach wheel event to page change
    **/
  attachScrollEvent() {}

  /*
       Detach wheel event from page change
    **/
  detachScrollEvent() {
    let i = 0;
    for (i = 0; i < this.eventCounter; i++) {
      window.removeEventListener("wheel", this.onScroll);
    }

    this.eventCounter = this.eventCounter - i;
  }

  /*
       Change slide on user scroll
    **/
  onScroll(e: {}) {
    // activate paralax if main panel is not shown
    if (!this.props.pages[this.props.currentPage].mainPanelContent) {
      this.setState({scrollEvent: e});
    }
  }

  render() {
    return (
      <PresentationDumb
        scrollEvent={this.state.scrollEvent}
        resetScrollEvent={this.resetScrollEvent}
        {...this.props}
      />
    );
  }
}

const ConnectedPresentation: React.ComponentType<OwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentation);

export default ConnectedPresentation;

export {PresentationDumb, Presentation};
