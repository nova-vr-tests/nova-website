import React from "react";

import getStyles from "./MainPanelStyles.jsx";

const MainPanel = props => {
  const styles = getStyles(props);

  const {Content} = props;

  return (
    <div style={styles.wrapper} className="MainPanel--wrapper">
      <Content />
    </div>
  );
};

MainPanel.defaultProps = {
  Content: () => <div />,
  isOpened: false,
};

export default MainPanel;
