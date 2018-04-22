// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
      pages: typeof initialState.appReducer.pages,
      currentPage: typeof initialState.appReducer.currentPage,
      cacheLayers: typeof initialState.bgReducer.cacheLayers,
      routing: typeof initialState.routing,
}

export type ReduxDispatch = {
    updateCacheLayers: (layers: typeof initialState.bgReducer.cacheLayers) => void,
    resetChacheLayers: () => void,
}

export type OwnProps = {}

export type State = {
    frontLayers: typeof initialState.bgReducer.frontLayers,
    backLayers: typeof initialState.bgReducer.backLayers,
    isFrontLayerShown: boolean,
}

export type Props = OwnProps & ReduxState & ReduxDispatch & State

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
