import * as React from "react";
import {styles as appStyles} from "../../constants.js";

const GoogleMaps = () => {
  const mapsAPIKey = "AIzaSyA3wJRRb7dBTy3qAzb17LEdIKfjqprQTUM";
  const styles = {
    iframe: {
      border: 0,
      width: "100%",
      // marginBottom: `calc(3 * ${appStyles.unitHeight})`,
      height: `calc(10 * ${appStyles.unitHeight})`,
      // marginTop: `calc(-1 * ${appStyles.unitHeight})`,
    },
  };
  return (
    <iframe
      height="450"
      title="Nova Media on Google Maps"
      frameBorder="0"
      style={styles.iframe}
      src={`https://www.google.com/maps/embed/v1/place?key=${mapsAPIKey}&q=481+Van+Brunt+St,+Brooklyn,+NY+11231`}
      allowFullScreen
    />
  );
};

export default GoogleMaps;
