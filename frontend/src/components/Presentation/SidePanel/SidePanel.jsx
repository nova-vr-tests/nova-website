// @flow

import * as React from 'react'

type Props = {
    isOpened: boolean,
    comp: React.Node,
}

const SidePanel: React.StatelessFunctionalComponent<Props> = props => {
    const styles = {
        wrapper: {
        },
        isOpened: {
        },
    }

    return (
        <div style={ styles.wrapper }>
            <h2>Test</h2>
        </div>
    )
}

export default SidePanel
