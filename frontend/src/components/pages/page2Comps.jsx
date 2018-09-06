import * as React from "react";

import MarkdownParser from "../MarkdownParser/MarkdownParser.jsx";
import * as websiteText from "./pageTexts.js";

/**
   EDUCTIONAL PORTAL => intro
 */
const DevelopIntro = () => {
  const styles = {
    wrapper: {},
  };

  return (
    <div className={"EdIntroComp--wrapper"} style={styles.wrapper}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteText.page2.texts.developIntro}
      />
    </div>
  );
};

export {DevelopIntro};
