// @flow

import type { Props } from './PresentationTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    sidePanel: CSSStyleDeclaration,
    toc: CSSStyleDeclaration,
}

const getStyles: GetStyles<Props, Styles> = props => {
    return {
        wrapper: {
            display: 'flex',
            flex: 1,
        },
        sidePanel: {
            display: 'flex',
            flex: 0.5,
        },
        toc: {
            display: 'flex',
            flex: 0.5,
        },
    }
}

export default getStyles
