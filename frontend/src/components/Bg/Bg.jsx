// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import type {
    ReduxState,
    ReduxDispatch,
    OwnProps,
    Props,
    LayerProps,
    LayerAssemblyProps,
} from './BgTypes.jsx'

import getStyles, {
    getLayerStyles,
    getLayerAssemblyStyles,
} from './BgStyles.jsx'

import type {
    MapStateToProps,
    MapDispatchToProps,
} from '../../storeTypes.jsx'

const mapStateToProps: MapStateToProps<ReduxState> = function(state) {
	return {
      slideTransitionProgress: state.bgReducer.transitionProgress,
      linePosition: state.appReducer.linePosition,
      frontLayers: state.bgReducer.frontLayers,
      backLayers: state.bgReducer.backLayers,
      cacheLayers: state.bgReducer.cacheLayers,
      appTheme: state.appReducer.appTheme,
  }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) { // eslint-disable-line no-unused-vars
	return {
  }
}

const Layer: React.StatelessFunctionalComponent<LayerProps> = props => {
    const styles = getLayerStyles(props)

    return (
        <div style={ styles.layer }>
        </div>
    )
}

const LayerAssembly: React.StatelessFunctionalComponent<LayerAssemblyProps> = props => {
    type GetLayers = (layers: typeof props.layers) => Array<React.Element<typeof Layer>>

    const styles = getLayerAssemblyStyles()

    const getLayers: GetLayers = layers => {
        return layers.map((e, i) => (
            <Layer
                imgUrl={ e.imgUrl }
                layerParalax={ e.paralax }
                translateY={ props.translateY }
                layerOpacity={ e.opacity }
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

const BgDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    return (
        <div style={ styles.wrapper } className="bar">


                <LayerAssembly
                    layers={ props.cacheLayers }
                    translateY={ 0 }
                />

            <div className="split-top" style={ styles.split.wrapper }>
                <LayerAssembly
                    layers={ props.backLayers }
                    translateY={ '0' }
                />
            </div>
            <div className="split-bottom" style={ { ...styles.split.wrapper, ...styles.split.wrapperBottom } }>
                <LayerAssembly
                    translateY={ styles.splitBottomTranslateY }
                    layers={ props.backLayers }
                />
            </div>


            <div className="front-bg" style={ {
                    ...styles.frontBg,
            } }>
                <LayerAssembly
                    layers={ props.frontLayers }
                    translateY={ '0' }
                />
            </div>


            <div className="back-bg" style={ {
                    ...styles.backBg,
                    opacity: props.slideTransitionProgress > 0.5 ? 0 : 1,
            } }>
                <LayerAssembly
                    layers={ props.backLayers }
                    translateY={ '0' }
                />
            </div>


            <div style={ styles.overlay }>
            </div>


        </div>
    )
}

const ConnectedBg: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(BgDumb)

export default ConnectedBg
