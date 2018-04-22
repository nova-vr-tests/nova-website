// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    lifecycle,
    pure,
    withState,
} from 'recompose'

import {
    updateCacheLayers,
} from '../../reducer/actions/Bg.js'

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
      currentPage: state.appReducer.currentPage,
      pages: state.appReducer.pages,
      cacheLayers: state.bgReducer.cacheLayers,
  }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) { // eslint-disable-line no-unused-vars
	return {
      updateCacheLayers: (l) => dispatch(updateCacheLayers(l)),
  }
}

const Layer: React.StatelessFunctionalComponent<LayerProps> = props => {
    const styles = getLayerStyles(props)

    return (
        <div style={ styles.layer }>
        </div>
    )
}

const LayerAssembly = (props: LayerAssemblyProps) => {
    type GetLayers = (layers: typeof props.layers) => Array<React.Element<typeof Layer>>

    const styles = getLayerAssemblyStyles(props)

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

LayerAssembly.defaultProps = {
    display: 1,
}

const BgDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    let { frontLayers, backLayers } = props

    return (
        <div style={ styles.wrapper } className="barr">
            <div className="front-bgg" style={ {
                    ...styles.frontBg,
            } }>
                <LayerAssembly
                    layers={ frontLayers }
                    translateY={ '0' }
                />
            </div>


            <div className="back-bgg" style={ {
                    ...styles.backBg,
            } }>
                <LayerAssembly
                    layers={ backLayers }
                    translateY={ '0' }
                />
            </div>


            <div style={ styles.overlay }>
            </div>


        </div>
    )
}

const HOC = compose(
    withState(
        'frontLayers',
        'setFrontLayers',
        [],
    ),
    withState(
        'backLayers',
        'setBackLayers',
        [],
    ),
    withState(
        'isFrontLayerShown',
        'setIsFrontLayerShown',
        false,
    ),
    lifecycle({
        componentWillUpdate(nextProps) {
            if(
                nextProps.currentPage !== this.props.currentPage
                || !this.props.frontLayers.length
            ) {
                const { layers } = nextProps.pages[nextProps.currentPage]

                if(this.props.isFrontLayerShown) {
                    this.props.setBackLayers(layers)
                    this.props.setIsFrontLayerShown(false)
                } else {
                    this.props.setFrontLayers(layers)
                    this.props.setIsFrontLayerShown(true)
                }
            }

            else if(
                nextProps.cacheLayers !== this.props.cacheLayers
                && nextProps.cacheLayers.length
            ) {
                const layers = this.props.cacheLayers

                if(this.props.isFrontLayerShown) {
                    this.props.setBackLayers(layers)
                    this.props.setIsFrontLayerShown(false)
                } else {
                    this.props.setFrontLayers(layers)
                    this.props.setIsFrontLayerShown(true)
                }
            }

            console.log(this.props.cacheLayers)
        }
    }),
    pure,
)(BgDumb)

const ConnectedBg: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(HOC)

export default ConnectedBg
