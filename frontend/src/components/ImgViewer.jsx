import React from 'react'
import { connect } from 'react-redux'

import {
    updateImgViewerUrl,
    updateImgViewerIsOpened,
} from '../reducer/actions/App.js'

const mapStateToProps = function(state) {
    return {
        url: state.appReducer.imgViewer.url,
        isOpened: state.appReducer.imgViewer.isOpened,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {

        updateImgViewerUrl: url => dispatch(updateImgViewerUrl(url)),
        updateImgViewerisOpened: isOpened => dispatch(updateImgViewerIsOpened(isOpened)),
    }
}

const ImgViewerDumb = props => {
    const styles = {
        wrapper: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: props.isOpened ? 1000000 : -100000,
            opacity: props.isOpened ? 1 : 0,
        },
    }
    return (
        <div style={ styles.wrapper } className="img-viewer">
            <img src={ props.url } alt="img" />
            <div
                onClick={ () => props.updateImgViewerisOpened(false) }
                style={ styles.closeWrapper }>
                Close
            </div>
        </div>
    )
}

const ConnectedImgViewer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImgViewerDumb)

export default ConnectedImgViewer
