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

export default [
    [
        [
            [World, "/world"],
            [Interface, "/interface"],
            [Story, "/story"],
        ],
        [
            [VR, "/vr"],
            [AR, "/ar"],
            [RelatedTechs, "/related-techs"],
        ],
        [
            [Influence, "/influence"],
            [Revolution, "/revolution"],
            [Solution, "/solution"],
        ],
    ],
    [
        [
            [LabProject1, "/lab-project-1"],
            [LabProject2, "/lab-project-2"],
            [LabProject3, "/lab-project-3"],
        ],
        [
            [NewsProject1, "/news-project-1"],
            [NewsProject2, "/news-project-2"],
            [NewsProject3, "/news-project-3"],
        ],
        [
            [EdProject1, "/ed-project-1"],
            [EdProject2, "/ed-project-2"],
            [EdProject3, "/ed-project-3"],
        ],
    ],
    [
        [Improve, "/improve"],
        [Innovate, "/innovate"],
        [Strengthen, "/strengthen"],
    ],
]
