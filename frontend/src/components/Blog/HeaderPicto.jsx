// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    lifecycle,
} from 'recompose'

import getStyles from './HeaderPictoStyles.jsx'

import type {
    ReduxState,
    ReduxDispatch,
} from './HeaderPictoTypes.jsx'

import type {
    OwnProps,
    Props,
} from './HeaderPictoTypes.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'


const mapStateToProps: MapStateToProps<ReduxState> = state => ({
    windowWidth: state.appReducer.windowWidth,
    windowHeight: state.appReducer.windowHeight,
})

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = dispatch => ({
})


const canvasId = 'picto-canvas'

const HeaderPictoDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    return (
        <div
            className="HeaderPicto--wrapper"
            style={ styles.wrapper }>
            <canvas id={ canvasId }>
            </canvas>
            <div id="invertbtn">click</div>
        </div>
    )
}

function loadImg(props) {
    var img = new Image()
    console.log(props.url)
    img.src = props.url
    img.crossOrigin = "anonymous"
    img.onload = function() {
        draw(this)
    }

    function draw(img) {
        var canvas = document.getElementById(canvasId)
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        img.style.display = 'none'
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        var data = imageData.data

        var invert = function() {
            for (var i = 0; i < data.length; i += 4) {
            data[i]     = 255 - data[i]     // red
            data[i + 1] = 255 - data[i + 1] // green
            data[i + 2] = 255 - data[i + 2] // blue
            }
            ctx.putImageData(imageData, 0, 0)
        };

        var grayscale = function() {
            for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i]     = avg // red
            data[i + 1] = avg // green
            data[i + 2] = avg // blue
            }
            ctx.putImageData(imageData, 0, 0)
        }

        var invertbtn = document.getElementById('invertbtn')
        invertbtn.addEventListener('click', invert)
        var grayscalebtn = document.getElementById('grayscalebtn')
        grayscalebtn.addEventListener('click', grayscale)
    }
}

const HeaderPictoSmart = compose(
    lifecycle({
        componentDidMount() {
            loadImg(this.props)
        },
        componentWillReceiveProps(nextProps) {
            loadImg(nextProps)
        }
    }),
)(HeaderPictoDumb)


const ConnectedHeaderPicto: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderPictoSmart)


export default ConnectedHeaderPicto
export {
    HeaderPictoDumb,
    HeaderPictoSmart,
}
