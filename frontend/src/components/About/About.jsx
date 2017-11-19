// @flow

import * as React from 'react'
import getStyles from './AboutStyles.jsx'

import type { Props } from './AboutTypes.jsx'

import SidePanel, { sidePanelTypes } from '../Presentation/SidePanel/SidePanel.jsx'

const AboutUs: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper }>
            <SidePanel type={ sidePanelTypes.INVERTED }>
                hello
            </SidePanel>
        </div>
    )
}

export default AboutUs
