import React from 'react'
import { connect }from 'react-redux'
import defaultBg from '../img/default.jpg'

const mapStateToProps = function(state) {
	return {
      bgUrl: state.appReducer.bgUrl,
      frontBg: state.bgReducer.frontBg,
      backBg: state.bgReducer.backBg,
      slideTransitionProgress: state.bgReducer.transitionProgress,
      linePosition: state.appReducer.linePosition,
      frontLayers: state.bgReducer.frontLayers,
      backLayers: state.bgReducer.backLayers,
  }
}

const mapDispatchToProps = function(dispatch) {
	return {
  }
}

const Layer = props => {
    const styles = {
        layer: {
            backgroundImage: 'url(' + props.imgUrl + ')',
            backgroundSize: 'cover',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            backgroundPosition: props.layerParalax,
            opacity: props.layerOpacity,
            transform: 'translateY(' + props.translateY + ')',
            ...props.layerStyles,
        },
    }

    return (
        <div style={ styles.layer }>
        </div>
    )
}

Layer.defaultProps = {
    layerOpacity: 1,
    layerParalax: 0,
    layerStyles: {},
    imgUrl: '',
    translateY: 0,
}

const LayerAssembly = props => {
    const styles = {
        wrapper: {
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        }
    }

    const getLayers = layers => {
        return layers.map((e, i) => (
            <Layer
                imgUrl={ e.imgUrl }
                layerStyles={ e.styles }
                layerParalax={ e.paralax }
                translateY={ props.translateY }
                key={ i }
            />
        ))
    }

    return (
        <div style={ styles.wrapper }>
            { getLayers(props.layers) }
        </div>
    )
}

LayerAssembly.defaultProps = {
    layers: [],
    translateY: 0,
}

const BgDumb = props => {

    const getBg = bgUrl => bgUrl === '' ? defaultBg : bgUrl

    const headerHeight = 200 / 24
    const footerHeight = headerHeight

    const lineTopFactor = (9 + 2 * props.linePosition) / 24 * 100
    const lineTop = lineTopFactor + 'vh'
    const lineHeightFactor = 4 * 100 / 24
    const lineHeight = lineHeightFactor + 'vh'
    const pageHeight = document.documentElement.clientHeight
    const progress = props.slideTransitionProgress
    const vh = pageHeight / 100
    const heightBottomFactor = 100 - (lineTopFactor + lineHeightFactor + footerHeight)
    const heightBottom = heightBottomFactor + 'vh'

    const transformTop = 'calc(-' + progress + ' * ' + lineTop + ')'
    const transformBottom = 'calc(' + progress + ' * ' + heightBottom + ')'

    const paralaxBgFront = props.frontBg.paralax + 'px'
    const paralaxBgBack = props.backBg.paralax + 'px'

    const styles = {
        wrapper: {
            position: 'absolute',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
        },
        split: {
            wrapper: {
                width: '100vw',
                height: lineTop,
                position: 'absolute',
                overflow: 'hidden',
                zIndex: 2,
                transform: 'translateY(' + transformTop + ')',
            },
            wrapperBottom: {
                top: 'calc(' + lineTop + ' + ' + lineHeight + ')',
                height: '100vh',
                transform: 'translateY(' + transformBottom + ')',
            },
        },
        frontBg: {
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        },
        backBg: {
            zIndex: -2,
            height: '100vh',
            width: '100vw',
            position: 'absolute',

            ...props.backBg.style,
        },
        overlay: {
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 3,
            position: 'absolute',
        }
    }

    /**

    const frontLayers = [
        {
            imgUrl: getBg(props.frontBg.url),
            paralax: paralaxBgFront,
        },
    ]

    const backLayers = [
        {
            imgUrl: getBg(props.backBg.url),
            paralax: paralaxBgBack,
        },
    ]

    */

    return (
        <div style={ styles.wrapper } className="bar">


            <div className="split-top" style={ styles.split.wrapper }>
                <LayerAssembly
                    layers={ props.backLayers }
                />
            </div>
            <div className="split-bottom" style={ { ...styles.split.wrapper, ...styles.split.wrapperBottom } }>
                <LayerAssembly
                    translateY={ 'calc(-' + lineTop + ' - ' + lineHeight + ')' }
                    layers={ props.backLayers }
                />
            </div>


            <div className="front-bg" style={ {
                    ...styles.frontBg,
                    ...props.frontBg.style,
            } }>
                <LayerAssembly
                    layers={ props.frontLayers }
                />
            </div>


            <div className="back-bg" style={ {
                    ...styles.backBg,
                    opacity: props.slideTransitionProgress > 0.5 ? 0 : 1,
            } }>
                <LayerAssembly
                    layers={ props.backLayers }
                />
            </div>


            <div style={ styles.overlay }>
            </div>


        </div>
    )
}

class Bg extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <BgDumb { ...this.props } />
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bg)
