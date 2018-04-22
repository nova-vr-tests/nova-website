// @flow

import { initialState } from '../../store.js'

export type ReduxState = {
      pages: typeof initialState.appReducer.pages,
      currentPage: typeof initialState.appReducer.currentPage,
}

export type ReduxDispatch = {
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
