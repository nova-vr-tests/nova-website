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
import connectToStore from './PageSmart.jsx'

import bg1 from '../img/design/1.png'
import bg2 from '../img/design/2.png'
import bg3 from '../img/design/3.png'

const pageStructure = [
    [
        [
            [connectToStore(World, bg1), "/world"],
            [connectToStore(Interface, bg2), "/interface"],
            [connectToStore(Story, bg3), "/story"],
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
        [connectToStore(Innovate), "/innovate"],
        [connectToStore(Improve), "/improve"],
        [connectToStore(Strengthen), "/strengthen"],
    ],
]

const getLinkList = pageStructure => {
    const linkList = []

    for(let i = 0; i < pageStructure.length; i++) {
        for(let j = 0; j < pageStructure[i].length; j++) {
            // if sub-section has sub-sub-sections
            if(pageStructure[i][j].length > 2) {
                for(let k = 0; k < pageStructure[i][j].length; k++) {
                    linkList.push([pageStructure[i][j][k][1], i])
                }
            } else {
                linkList.push([pageStructure[i][j][1], i])
            }
        }
    }

    linkList.push(['/', 0])

    return linkList
}

const linkList = getLinkList(pageStructure)
const getLinePosition = path => linkList.filter(e => e[0] === path).pop()[1]

export default pageStructure
export {
    getLinePosition,
}
