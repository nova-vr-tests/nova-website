import * as React from "react";

import MarkdownParser from "../MarkdownParser/MarkdownParser.jsx";

import HomePage from "./Home.jsx";
import * as websiteText from "./pageTexts.js";

const ConsultationIntro = () => {
  const styles = {
    wrapper: {},
  };

  return (
    <div className={"DesignInterfaceComp--wrapper"} style={styles.wrapper}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteText.page1.texts.consultationIntro}
      />
    </div>
  );
};

const Comp404Text = () => {
  const styles = {
    wrapper: {},
  };

  return (
    <div className={"404--wrapper"} style={styles.wrapper}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteText.incognito.texts.comp404}
      />
    </div>
  );
};

export {HomePage, ConsultationIntro, Comp404Text};
