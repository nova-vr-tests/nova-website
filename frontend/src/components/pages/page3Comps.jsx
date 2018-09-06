import React from "react";

import MarkdownParser from "../MarkdownParser/MarkdownParser.jsx";
import GoogleMaps from "../UI/GoogleMaps.tsx";
import * as websiteTexts from "./pageTexts.js";

const PartnershipIntro = () => {
  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteTexts.page3.texts.partnershipIntro}
      />
    </div>
  );
};

const FindUs = () => {
  return (
    <div className={"NYEComp--wrapper"}>
      <GoogleMaps />
      <MarkdownParser
        style={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteTexts.page3.texts.findUs}
      />
    </div>
  );
};

const WhoWeAreIntro = () => {
  return (
    <div className={"Who-we-are-intro--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={websiteTexts.page3.texts.whoWeAreIntro}
      />
    </div>
  );
};

const AboutUsComp = () => {
  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser content={websiteTexts.page3.texts.whoWeAre} />
    </div>
  );
};

export {WhoWeAreIntro, AboutUsComp, PartnershipIntro, FindUs};
