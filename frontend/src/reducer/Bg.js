// @flow

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

export const UPDATE_TRANSITION_PROGRESS = 'bg/update_transition_progress'
export type UpdateTransitionProgress = {
    type: 'bg/update_transition_progress',
    transitionProgress: number,
}

export const UPDATE_FRONT_LAYERS = 'bg/update_front_layers'
export type UpdateFrontLayers = {
    type: 'bg/update_front_layers',
    frontLayers: Array<BgLayer>,
}

export const UPDATE_BACK_LAYERS = 'bg/update_back_layers'
export type UpdateBackLayers = {
    type: 'bg/update_back_layers',
    backLayers: Array<BgLayer>,
}

export const UPDATE_CACHE_LAYERS = 'bg/update_cache_layers'
export type UpdateCacheLayers = {
    type: 'bg/update_cache_layers',
    cacheLayers: Array<BgLayer>,
}

export type Action = UpdateTransitionProgress
    | UpdateFrontLayers
    | UpdateBackLayers
    | UpdateCacheLayers

const initialState: State = {
    frontLayers: [],
    backLayers: [],
    cacheLayers: [],
    transitionProgress: 0,
}

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case UPDATE_CACHE_LAYERS:
            return {
                ...state,
                cacheLayers: action.cacheLayers,
            }
        case UPDATE_BACK_LAYERS:
            return {
                ...state,
                backLayers: action.backLayers,
            }
        case UPDATE_FRONT_LAYERS:
            return {
                ...state,
                frontLayers: action.frontLayers,
            }
        case UPDATE_TRANSITION_PROGRESS:
            return {
                ...state,
                transitionProgress: action.transitionProgress,
            }
        default:
            return state
    }
}
