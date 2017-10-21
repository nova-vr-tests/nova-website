// @flow

/**
   State type
 */

export type BgLayer = {
    imgUrl: string,
    paralax: number,
    opacity: number,
}

export type State = {
    frontLayers: Array<BgLayer>,
    backLayers: Array<BgLayer>,
    cacheLayers: Array<BgLayer>,
    transitionProgress: number,
}
/**
   Action types
 */

export type UpdateTransitionProgress = {
    type: 'bg/update_transition_progress',
    transitionProgress: number,
}

export type UpdateFrontLayers = {
    type: 'bg/update_front_layers',
    frontLayers: Array<BgLayer>,
}

export type UpdateBackLayers = {
    type: 'bg/update_back_layers',
    backLayers: Array<BgLayer>,
}

export type UpdateCacheLayers = {
    type: 'bg/update_cache_layers',
    cacheLayers: Array<BgLayer>,
}

export type Action = UpdateTransitionProgress
    | UpdateFrontLayers
    | UpdateBackLayers
    | UpdateCacheLayers
