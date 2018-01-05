// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import {
    compose,
    lifecycle,
    pure,
} from 'recompose'

import {
    updateCacheLayers,
    updateFrontLayers,
    updateBackLayers,
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
      slideTransitionProgress: state.bgReducer.transitionProgress,
      linePosition: state.appReducer.linePosition,
      frontLayers: state.bgReducer.frontLayers,
      backLayers: state.bgReducer.backLayers,
      cacheLayers: state.bgReducer.cacheLayers,
      appTheme: state.appReducer.appTheme,
      currentPage: state.appReducer.currentPage,
      pages: state.appReducer.pages,
      progress: state.bgReducer.progress,
      frontLayersPid: state.bgReducer.frontLayersPid,
      backLayersPid: state.bgReducer.backLayersPid,
      cacheLayersPid: state.bgReducer.cacheLayersPid,
      isDreamscaping: state.bgReducer.isDreamscaping,
  }
}

const mapDispatchToProps: MapDispatchToProps<ReduxDispatch> = function(dispatch) { // eslint-disable-line no-unused-vars
	return {
      updateFrontLayers: (l, pid) => dispatch(updateFrontLayers(l, pid)),
      updateBackLayers: (l, pid) => dispatch(updateBackLayers(l, pid)),
      updateCacheLayers: (l, pid) => dispatch(updateCacheLayers(l, pid)),
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
    if(!props.display) {
        styles.wrapper.display = 'none'
    }

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

const updateLayers = (layers, progress, pid, pages) => {

    if(layers.length === 0) {
        return layers
    }

    const keyframes = pages
                        .filter(e => e.pid === pid)
                        .map(e => e.layers
                                    .map(f => ({
                                        paralax: f.paralax,
                                        opacity: f.opacity
                                    }))
                        )

    // no parallax with 1 keyframe or less
    if(keyframes.length <= 1) {
        return layers
    }

    return layers.map((l, i) => {


        const delta = 1 / (keyframes.length - 1)

        let j
        for(j = 0; j < keyframes.length; j++) {
            if (progress < ( j+ 1) * delta) {
                break
            }
        }

        let slideStart = j <= 0 ? 0 : j
        let slideEnd = j >= keyframes.length - 1 ? keyframes.length - 1 : slideStart + 1
        slideStart = slideStart === slideEnd && slideStart !== 0 ? slideEnd - 1 : slideStart



        // hack to skip during layer caching
        if (keyframes[0].length - 1 < i) return l


        const paralaxStart = keyframes[slideStart][i].paralax
        const paralaxEnd = keyframes[slideEnd][i].paralax
        let paralax = paralaxStart + (paralaxEnd - paralaxStart) * (progress - slideStart * delta) / delta

        const opacityStart = keyframes[slideStart][i].opacity
        const opacityEnd = keyframes[slideEnd][i].opacity
        const opacitySign = opacityStart > opacityEnd ? -1 : 1

        let opacity = opacityStart + (opacityEnd - opacityStart) * (progress - slideStart * delta) / delta

        return {
            ...l,
            paralax,
            opacity,
        }
    })
}

const updateParalax = props => {
    let { frontLayers, backLayers, cacheLayers } = props

    if(props.pages.length > 0) {
        if(
            !props.isDreamscaping
        ) {
            cacheLayers = updateLayers(cacheLayers, props.progress, props.cacheLayersPid, props.pages)
            if(isFrontBgShown) {
                if(frontLayers.length) {
                    frontLayers = updateLayers(frontLayers, props.progress, props.frontLayersPid, props.pages)
                } else {
                    backLayers = updateLayers(backLayers, props.progress, props.backLayersPid, props.pages)
                }
            }
            else
                backLayers = updateLayers(backLayers, props.progress, props.backLayersPid, props.pages)
        }
    }

    return {
        frontLayers,
        backLayers,
        cacheLayers,
    }
}

let isFrontBgShown = true
let prevCurrentPage = -1
const BgDumb: React.StatelessFunctionalComponent<Props> = props => {
    const styles = getStyles(props)

    let { frontLayers, backLayers, cacheLayers } = props

    const currentPage = props.pages[props.currentPage]
     if(prevCurrentPage > props.currentPage) {
         isFrontBgShown = false
         prevCurrentPage = props.currentPage
     } else if (prevCurrentPage < props.currentPage) {
         isFrontBgShown = true
         prevCurrentPage = props.currentPage
     }

    return (
        <div style={ styles.wrapper } className="bar">
                <LayerAssembly
                    layers={ cacheLayers }
                    translateY={ 0 }
                />

            <div className="split-top" style={ styles.split.wrapper }>
                <LayerAssembly
                    layers={ backLayers }
                    translateY={ '0' }
                />
            </div>
            <div className="split-bottom" style={ { ...styles.split.wrapper, ...styles.split.wrapperBottom } }>
                <LayerAssembly
                    translateY={ styles.splitBottomTranslateY }
                    layers={ backLayers }
                />
            </div>


            <div className="front-bg" style={ {
                    ...styles.frontBg,
            } }>
                <LayerAssembly
                    layers={ frontLayers }
                    translateY={ '0' }
                />
            </div>


            <div className="back-bg" style={ {
                    ...styles.backBg,
                    opacity: props.slideTransitionProgress > 0.5 ? 0 : 1,
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
    lifecycle({
        componentDidUpdate(prevProps) {
            const { frontLayers, backLayers, cacheLayers } = updateParalax(this.props)
            if(
                JSON.stringify(frontLayers) !== JSON.stringify(this.props.frontLayers)
                || JSON.stringify(backLayers) !== JSON.stringify(this.props.backLayers)
                || JSON.stringify(cacheLayers) !== JSON.stringify(this.props.cacheLayers)
            ) {
                this.props.updateFrontLayers(frontLayers, this.props.frontLayersPid)
                this.props.updateBackLayers(backLayers, this.props.backLayersPid)
                this.props.updateCacheLayers(cacheLayers, this.props.cacheLayersPid)
            }
        }
    }),
    pure
)(BgDumb)

const ConnectedBg: React.ComponentType<OwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(HOC)

export default ConnectedBg
