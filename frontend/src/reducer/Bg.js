// @flow
import type {
    State,
    Action
} from './BgTypes.jsx'

/**
   Initial state
*/
export const initialState: State = {
    frontLayers: [],
    backLayers: [],
    cacheLayers: [],
    transitionProgress: 0,
}

/**
   Action types
*/
export const UPDATE_TRANSITION_PROGRESS = 'bg/update_transition_progress'
export const UPDATE_FRONT_LAYERS = 'bg/update_front_layers'
export const UPDATE_BACK_LAYERS = 'bg/update_back_layers'
export const UPDATE_CACHE_LAYERS = 'bg/update_cache_layers'

/**
   Reducer
*/
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
