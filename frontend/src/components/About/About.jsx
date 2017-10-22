// @flow

import * as React from 'react'
import getStyles from './AboutStyles.jsx'

import type { Props } from './AboutTypes.jsx'

const AboutUs: React.StatelessFunctionalComponent<Props> = (props) => {
    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper }>
            <h1 style={ styles.h1 }>
                About Us
            </h1>
            <p style={ styles.p }>
                Email us at : <a href="mailto:joe@novamedia.nyc">joe@novamedia.nyc</a>
            </p>
        </div>
    )
}

export default AboutUs
