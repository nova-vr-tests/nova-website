import React from 'react'

import getStyles, {
} from './MainPanelStyles.jsx'

const MainPanel = props => {
    const styles = getStyles(props)
    console.log(props, styles)

    const { Content } = props

    return (
        <div
            style={ styles.wrapper }
            className="MainPanel--wrapper">
            <Content />
        </div>
    )
}

MainPanel.defaultProps = {
    Content: () => <div></div>,
    isOpened: false,
}

export default MainPanel
