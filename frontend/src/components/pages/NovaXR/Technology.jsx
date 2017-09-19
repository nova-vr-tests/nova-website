import React from 'react'

const VR = props => {
    props.updateLinePosition(0)

    return <h1>VR</h1>
}

const AR = props => {
    props.updateLinePosition(0)

    return <h1>AR</h1>
}

const RelatedTechs = props => {
    props.updateLinePosition(0)

    return <h1>Related Techs</h1>
}

export {
    VR,
    AR,
    RelatedTechs,
}
