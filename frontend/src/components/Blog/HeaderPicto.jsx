// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    lifecycle,
    withHandlers,
} from 'recompose'

import getStyles from './HeaderPictoStyles.jsx'

import type {
    ReduxState,
} from './HeaderPictoTypes.jsx'

import type {
    OwnProps,
    Props,
} from './HeaderPictoTypes.jsx'

import type {
    MapStateToProps,
} from '../../storeTypes.jsx'


const mapStateToProps: MapStateToProps<ReduxState> = state => ({
    windowWidth: state.appReducer.windowWidth,
    windowHeight: state.appReducer.windowHeight,
})

const canvasId = 'picto-canvas'

const HeaderPictoDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    return (
        <div
            className="HeaderPicto--wrapper"
            style={ styles.wrapper }>
            <canvas
                ref={ props.onRef }
                id={ canvasId }>
            </canvas>
            <div id="invertbtn">click</div>
        </div>
    )
}

function loadImg(props: Props) {
    var img = new Image()
    img.src = props.url + '?' + Math.floor(Math.random() * 100)
    img.crossOrigin = "anonymous"
    img.onload = function() {
        draw(this)
    }

    function draw(img: Image) {
        var canvas = props.getRef()
        if(canvas) {
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
            }

            invert()
        }
    }
}

const HeaderPictoSmart = compose(
    withHandlers(() => {
        let myCanvas: ?HTMLCanvasElement = null

        return {
            onRef: () => ref => (myCanvas = ref),
            getRef: () => () => myCanvas,
        }
    }),
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
)(HeaderPictoSmart)


export default ConnectedHeaderPicto
export {
    HeaderPictoDumb,
    HeaderPictoSmart,
}
