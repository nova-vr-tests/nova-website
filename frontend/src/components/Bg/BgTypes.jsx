// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
      slideTransitionProgress: typeof initialState.bgReducer.transitionProgress,
      linePosition: typeof initialState.appReducer.linePosition,
      frontLayers: typeof initialState.bgReducer.frontLayers,
      backLayers: typeof initialState.bgReducer.backLayers,
      cacheLayers: typeof initialState.bgReducer.cacheLayers,
      appTheme: typeof initialState.appReducer.appTheme,
}

export type ReduxDispatch = {
}

export type OwnProps = {}

export type Props = OwnProps & ReduxState & ReduxDispatch

/**
   Layer types
*/
export type LayerProps = {
    layerOpacity: number,
    layerParalax: number,
    imgUrl: string,
    translateY: string | number,
}

/**
   LayerAssemblyProps types
*/
export type LayerAssemblyProps = {
    layers: typeof initialState.bgReducer.frontLayers,
    translateY: number | string,
}
