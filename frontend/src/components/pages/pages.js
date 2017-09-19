import {
    Influence,
    Revolution,
    Solution,
} from './NovaXR/Business.jsx'
import {
    World,
    Interface,
    Story,
} from './NovaXR/Design.jsx'
import {
    VR,
    AR,
    RelatedTechs,
} from './NovaXR/Technology.jsx'

import {
    EdProject1,
    EdProject2,
    EdProject3,
} from './Resources/EducationalPortal.jsx'
import {
    LabProject1,
    LabProject2,
    LabProject3,
} from './Resources/LabLive.jsx'
import {
    NewsProject1,
    NewsProject2,
    NewsProject3,
} from './Resources/NewsInsights.jsx'

import { Improve } from './Partnerships/Improve.jsx'
import { Innovate } from './Partnerships/Innovate.jsx'
import { Strengthen } from './Partnerships/Strengthen.jsx'


import React from 'react'
import { connect }from 'react-redux'
import { updateLinePosition } from '../../reducer/actions/App.js'


const mapStateToProps = function(state) {
	  return {
        linePosition: state.appReducer.linePosition,
    }
}

const mapDispatchToProps = function(dispatch) {
	  return {
        updateLinePosition: linePosition => dispatch(updateLinePosition(linePosition)),
    }
}

const connectToStore = Comp => connect(
    mapStateToProps,
    mapDispatchToProps
)(Comp)



export default [
    [
        [
            [connectToStore(World), "/world"],
            [connectToStore(Interface), "/interface"],
            [connectToStore(Story), "/story"],
        ],
        [
            [connectToStore(VR), "/vr"],
            [connectToStore(AR), "/ar"],
            [connectToStore(RelatedTechs), "/related-techs"],
        ],
        [
            [connectToStore(Influence), "/influence"],
            [connectToStore(Revolution), "/revolution"],
            [connectToStore(Solution), "/solution"],
        ],
    ],
    [
        [
            [connectToStore(LabProject1), "/lab-project-1"],
            [connectToStore(LabProject2), "/lab-project-2"],
            [connectToStore(LabProject3), "/lab-project-3"],
        ],
        [
            [connectToStore(NewsProject1), "/news-project-1"],
            [connectToStore(NewsProject2), "/news-project-2"],
            [connectToStore(NewsProject3), "/news-project-3"],
        ],
        [
            [connectToStore(EdProject1), "/ed-project-1"],
            [connectToStore(EdProject2), "/ed-project-2"],
            [connectToStore(EdProject3), "/ed-project-3"],
        ],
    ],
    [
        [connectToStore(Improve), "/improve"],
        [connectToStore(Innovate), "/innovate"],
        [connectToStore(Strengthen), "/strengthen"],
    ],
]
