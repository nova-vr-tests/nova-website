import React from 'react'

import { styles as appStyles } from '../../constants.js'
import arrow from '../img/arrow.svg'
import SocialButtons from '../Blog/SocialButtons.jsx'



const SidePanelProductsHeader = props => {
    const { unitHeight, unitWidth } = appStyles
    const showPicto = appStyles.mediaQueries.tablet > document.documentElement.clientWidth && props.isMainPanelOpened

    const styles = {
        mainWrapper: {
            display: 'flex',
            flex: 1,
            alignSelf: showPicto ? 'flex-start' : 'inherit',
            alignItems: 'center',
        },
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
            display: props.showArrow ? 'block' : 'none',
        },
        wrapper2: {
            display: 'flex',
            flex: 1,
            position: 'relative',
        },
        picto: {
            display: showPicto || props.forceShowPicto ? 'block' : 'none',
            height: `calc(3 * ${unitHeight})`,
            width: `calc(3 * ${unitHeight})`,
            borderRadius: '20px',
        },
        title: {
            margin: 0,
            marginLeft: `calc(1 * ${unitWidth})`,
            height: `calc(1 * ${unitHeight})`,
            transform: showPicto ? 'translateY(50%)' : 'inherit',
            display: 'flex',
            alignItems: 'center',
        },
        socialWrapper: {
            display: showPicto ? 'block' : 'none',
        },
    }

    const pictoUrl = props.pictoUrl ? new URL(props.pictoUrl).origin + new URL(props.pictoUrl).pathname : ''

    return (
        <div style={ styles.mainWrapper }>
            <div
                style={ styles.wrapper1 }
                onClick={ props.onClickCallback }
                key={ 1 }>
                <img
                    src={ arrow }
                    style={ styles.arrow }
                    alt="back" />
            </div>
            <div style={ styles.wrapper2 } key={ 2 }>
            <img
                alt={ "picto" }
                style={ styles.picto }
                src={ pictoUrl } />
                <h3 style={ styles.title }>{ props.title }</h3>
                <div style={ styles.socialWrapper } >
                    <SocialButtons />
                </div>
            </div>
        </div>
    )
}

SidePanelProductsHeader.defaultProps = {
    onClickCallback: () => {},
    title: '',
    subtitle: '',
    pictoUrl: '',
    isMainPanelOpened: false,
    showArrow: true,
    forceShowPicto: false,
}

export default SidePanelProductsHeader
