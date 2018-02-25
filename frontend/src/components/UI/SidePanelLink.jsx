import React from 'react'

import getStyles from './SidePanelLinkStyles.jsx'



const SidePanelLink = props => {
    const styles = getStyles(props)

    const wrapperStyle = {
        ...styles.linkWrapper,
        ...(props.isActive ? styles.activeLink : {})
    }

    return (
        <div
            style={ wrapperStyle }
            onClick={ props.onClickCallback }
            className="product-link--wrapper">
            <img
                src={ props.pictoUrl }
                alt="picto"
                style={ styles.picto } />
            <div style={ styles.textWrapper }>
                <div style={ styles.title }>
                    { props.title }
                </div>
                { props.subtitle !== '' ?
                    <div style={ styles.subtitle }>
                        { props.subtitle }
                    </div>
                  :
                    ''
                }
            </div>
        </div>
    )
}

SidePanelLink.defaultProps = {
    onClickCallback: () => {},
    pictoUrl: '',
    title: '',
    subtitle: '',
    isActive: false,
}

export default SidePanelLink
