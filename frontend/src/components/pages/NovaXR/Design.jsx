import React from 'react'

const World = props => {
    props.updateLinePosition(0)

    return <h1>World</h1>
}

const Interface = props => {
    props.updateLinePosition(0)

    return <h1>Interface</h1>
}

const Story = props => {
    props.updateLinePosition(0)

    return <h1>Story</h1>
}

export {
    World,
    Interface,
    Story,
}
