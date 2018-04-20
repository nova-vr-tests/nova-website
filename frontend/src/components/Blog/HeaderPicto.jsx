// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { styles as appStyles } from '../../constants.js'
import {
    compose,
    lifecycle,
    withHandlers,
} from 'recompose'

import getStyles from './HeaderPictoStyles.jsx'
import Worker from 'worker-loader!./worker.js'

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
        </div>
    )
}

function loadImg(props: Props) {
    var img = new Image()
    img.src = props.url + '?' + Math.floor(Math.random() * 100)
    img.crossOrigin = "anonymous"

    img.onload = function() {
        // const obj = {
        //     canvas: props.getRef(),
        //     img,
        //     appStyles,
        //     clientHeight: document.documentElement.clientHeight,
        //     clientWidth: document.documentElement.clientWidth,
        //     imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
        // }
        // const worker = new Worker()
        // worker.postMessage([obj])
        // worker.onmessage = e => console.log(e)

        draw(this)
    }

    function draw(img: Image) {
        var canvas = props.getRef()
        if(canvas) {
            canvas.height = img.height //
            canvas.width = img.width //canvas.height
            const scaleFactor = 6.75 * appStyles.unitHeightJs / canvas.width
            canvas.style.position = 'absolute'
            canvas.style.transform =
                `translateY(calc(-${canvas.height * (1- scaleFactor) * 0.5}px - 0.76 * ${appStyles.unitHeight}))
                translateX(-${canvas.width * (1- scaleFactor) * 0.5}px)
                scale(${scaleFactor}, ${scaleFactor})`

            const ctx = canvas.getContext('2d')
            ctx.imageSmoothingEnabled = true

            //ctx.scale(scaleFactor, scaleFactor)
            ctx.drawImage(img, 0, 0)
            img.style.display = 'none'

            const  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

            const obj = {
                width: canvas.width,
                clientHeight: document.documentElement.clientHeight,
                clientWidth: document.documentElement.clientWidth,
                appStyles,
                imageData,
                scaleFactor,
            }

            const worker = new Worker()
            worker.postMessage([obj])
            worker.onmessage = e => {
                const { processedImg } = e.data
                console.log(processedImg)
                ctx.putImageData(e.data.processedImg, 0, 0)
            }

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
