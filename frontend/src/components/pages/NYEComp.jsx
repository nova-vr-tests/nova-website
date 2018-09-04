import React from "react";

import MarkdownParser from "../MarkdownParser/MarkdownParser.jsx";

import {P, FlexColumn} from "./UI.jsx";

const PartnershipIntro = () => {
  const source = `# Introduction

Business is conducted among people. We love building relationships with folks from all over the world. It's who we are. In the process we've discovered this mentality is the same one that builds strong partnerships. Nova is a place of business because we value the individual, understanding that the financial elements of business emerge from a genuine interest in thy neighbor.`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={source}
      />
    </div>
  );
};

const FindUs = () => {
  const source = `- 481 Van Brunt Street Brooklyn
- New York, United States. 11231
- [Google Maps](https://goo.gl/maps/PN4nHf5oD9J2)

Our studio and laboratory are located at the edge of Red Hook. When Van Brunt Street meets the Upper Bay, under Liberty's watch. This part of South Brooklyn has a rich history of hard work, innovation, and the American Dream. Our building is Civil War-era, built by Robinson and Beard in the 1860s and 70s. Now it is home to a variety of artists and tradesmen that fuel the innovation Brooklyn is known for.

Have an idea you want to explore? Come on by! Fridays are best. email joe@novamedia.nyc`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={source}
      />
    </div>
  );
};

const Philosophy = () => {
  const source = `### *Do unto others*

As pioneers our duty is to explore new media, publish our findings, and map the way.

The fringe of technology is full of ethical complexities and it is our responsibility to set a high moral standard for the industry.

We lead by example, challenge traditional structures and fight for underdogs.

*We Dream Awake*.

`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={source}
      />
    </div>
  );
};

const Community = () => {
  const source = `### Philanthropy

We provide education and access to those with less opportunity. May it be teaching Red Hook West Housing Project’s youth how to code, or brining internet and PCs to under developed villages, we are on determined be the change that betters the world.

#### Join our mission to spread good fortune.

##### Local

    programming, art and business plasses for project kids
    design classes

##### global

Connect the isolated

Provide internet access to remote villages in Albania, eabling them to connect with the world. Further, we provide free online classes and mentor them in developing their computer skills. These skills allow them to be be paid at 6-factor of the current rate to work at a bazzar, airport, or restuarant. They will provide for their entire family through remote computer work.`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={source}
      />
    </div>
  );
};

const NYEIntroComp = () => {
  const source = `# Introduction

Virtual Reality brings us to a place where the confines of the physical world can disappear. Time and gravity and our relationship with space have been as much a part of the human experience as our need for air. Now, in these virtual worlds, we’re breaking free from these physical measurements.

!!! We're reminded of our quest for this new idea of freedom every time we look out the window of our Nova Studios and see the Statue of Liberty.

100 years after the United States formed its own union, the French designed and built the Statue of Liberty to honor this new version of freedom. It's emergence was followed by one of the greatest periods of human migration, as nearly 20 million people immigrated through the New York Harbor in search of freedom from religious persecution, economic disparity, and tyrannical leadership - elements of their human experience that had shackled them in their home nations.

As these immigrants arrived to the New York Harbor fresh off a weeks-long journey across the Atlantic, they saw her, 151 feet tall, holding up a beacon of light and with a set of shackles laying broken at her feet.

More than a century later, Nova XR's studios sit right here in union with her - Extending Reality along a quest to reach this next world of media.

Two of our co founders trace their lineage back to folks who emigrated across the Atlantic toward the end of the 19th century, while two others come from Paris, the city in which La Liberté éclairant le monde was conceived.

Together we're a small part of the 21st century movement into Extended Reality, and we're inviting others to come along.`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser
        styles={{textColor: "white", fontSize: "1.5rem"}}
        content={source}
      />
    </div>
  );
};

const NYEStreamComp = () => {
  const source = `# Nova

We design and build virtual reality.  We provide you with access and application to advanced technologies and  adoption of advanced media technologies.    We are a team of artists, engineers and researchers.  We produce XR.  This includes financial strategies, prototypes, and marketing.  We can execute your project in full or assist only where you need an extra hand. We custom spec and have turn-key solutions. Our production studio and lab is located at the edge of Red Hook, Brooklyn. 


## Live and let

- Twitter: [@N0vamedia](https://twitter.com/n0vamedia)
- Facebook: https://www.facebook.com/N0vamedia/
- Email: [AnnaIrene@novamedia.nyc](mailto:AnnaIrene@novamedia.nyc)
- Linkedin: [/in/jrmecca](https://www.linkedin.com/in/jrmecca/)
- Instagram: [@novaxrmedia](https://www.instagram.com/novaxrmedia)
- Github: [@mecs13](https://github.com/mecs13)
- Steemit: [@novaxr](https://steemit.com/@novaxr)
- Slack: https://novamedianyc.slack.com
- Telegram: https://t.me/xrnewyork
- Telephone: +1 (732) 903-5537
`;

  return (
    <div className={"NYEComp--wrapper"}>
      <MarkdownParser content={source} />
    </div>
  );
};

const NYEDestComp = () => {
  return (
    <div className={"NYEDestComp--wrapper"}>
      <FlexColumn>
        <P>
          We decided on these 10 locations based on our advanced and data-driven
          scouting report. The content will live live across twelve time zones.
        </P>
        <P>
          If we had to bring the production to market tomorrow, the destinations
          would be: Bikini Taipei, Dubai, Istanbul, Kiev, Paris, New York,
          Buenos Aires, San Francisco and Juno.
        </P>
      </FlexColumn>
    </div>
  );
};

const NYEDistrComp = () => {
  return (
    <div className={"NYEDistrComp--wrapper"}>
      <FlexColumn />
    </div>
  );
};

export {
  NYEIntroComp,
  NYEStreamComp,
  NYEDestComp,
  NYEDistrComp,
  Community,
  PartnershipIntro,
  Philosophy,
  FindUs,
};
