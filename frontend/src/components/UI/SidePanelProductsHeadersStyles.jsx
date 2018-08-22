import {styles as appStyles} from "../../constants";

const getStyles = props => {
  const {clientWidth} = document.documentElement;

  if (clientWidth < appStyles.mediaQueries.phone) {
  }

  const styles = {};

  return styles;
};

export default getStyles;
