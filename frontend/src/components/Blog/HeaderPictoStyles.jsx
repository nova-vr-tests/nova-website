// @flow

import type { Props } from './HeaderPictoTypes.jsx'
import { styles as appStyles } from '../../constants.js'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    img : CSSStyleDeclaration,
}

// eslint-disable-next-line no-unused-vars
const getStyles: GetStyles<Props, Styles> = props => {
    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        img: {
            height: `calc(3.5 * ${appStyles.unitHeight})`,
            width: `calc(3.5 * ${appStyles.unitHeight})`,
            borderRadius: '12.1%',
            marginLeft: `calc(0.75 * ${appStyles.unitWidth})`,
        }
    }
}

export default getStyles
