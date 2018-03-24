// @flow

import { styles as appStyles } from '../../constants.js'

import type { Props } from './HeaderPictoTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
}

// eslint-disable-next-line no-unused-vars
const getStyles: GetStyles<Props, Styles> = props => {
    return {
        wrapper: {
        },
    }
}

export default getStyles
