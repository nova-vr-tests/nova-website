import React from 'react'

import arrow from '../img/arrow.svg'



const SidePanelProductsHeader = props => {
    return [
        <div
            onClick={ props.onClickCallback }
            key={ 1 }>
            <img
                src={ arrow }
                style={{ cursor: 'pointer', width: '2rem', height: '2rem', transform: 'rotateZ(180deg)', marginRight: '2rem', }}
                alt="back" />
        </div>,
        <div key={ 2 }>
            <h3 style={{ margin: 0, }}>{ props.title }</h3>
            <div>{ props.subtitle }</div>
        </div>
    ]
}

SidePanelProductsHeader.defaultProps = {
    onClickCallback: () => {},
    title: '',
    subtitle: '',
}

export default SidePanelProductsHeader
