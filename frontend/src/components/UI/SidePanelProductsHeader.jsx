import React from 'react'

import { styles as appStyles } from '../../constants.js'
import arrow from '../img/arrow.svg'



const SidePanelProductsHeader = props => {
    const { unitHeight, unitWidth } = appStyles

    const styles = {
        wrapper1: {
            width: `calc(1 * ${unitWidth})`,
            display: 'flex',
            justifyContent: 'center',
        },
        arrow: {
            cursor: 'pointer',
            width: '2rem',
            height: '2rem',
            transform: 'rotateZ(180deg)',
        },
        wrapper2: {
            display: 'flex',
        },
        picto: {
            display: appStyles.mediaQueries.tablet > document.documentElement.clientWidth && props.isMainPanelOpened ? 'block' : 'none',
            height: `calc(3 * ${unitHeight})`,
            width: `calc(3 * ${unitHeight})`,
            borderRadius: '20px',
        },
        title: {
            margin: 0,
            marginLeft: `calc(1 * ${unitWidth})`,
        },
    }

    const pictoUrl = props.pictoUrl ? new URL(props.pictoUrl).origin + new URL(props.pictoUrl).pathname : ''

    return [
        <div
            style={ styles.wrapper1 }
            onClick={ props.onClickCallback }
            key={ 1 }>
            <img
                src={ arrow }
                style={ styles.arrow }
                alt="back" />
        </div>,
        <div style={ styles.wrapper2 } key={ 2 }>
          <img
            alt={ "picto" }
            style={ styles.picto }
            src={ pictoUrl } />
            <h3 style={ styles.title }>{ props.title }</h3>
            <div>{ props.subtitle }</div>
        </div>
    ]
}

SidePanelProductsHeader.defaultProps = {
    onClickCallback: () => {},
    title: '',
    subtitle: '',
    pictoUrl: '',
    isMainPanelOpened: false,
}

export default SidePanelProductsHeader
