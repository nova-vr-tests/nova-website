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
    progress: 0,
    frontLayersPid: 0,
    backLayersPid: 0,
    cacheLayersPid: 0,
    isDreamscaping: false,
}

/**
   Action types
*/
export const UPDATE_TRANSITION_PROGRESS = 'bg/update_transition_progress'
export const UPDATE_FRONT_LAYERS = 'bg/update_front_layers'
export const UPDATE_BACK_LAYERS = 'bg/update_back_layers'
export const UPDATE_CACHE_LAYERS = 'bg/update_cache_layers'
export const TRANSLATE_X_LAYERS_BGS = 'bg/translateX_all_layers'
export const UPDATE_IS_DREAMSCAPING = 'bg/update_is_dreamscaping'
export const UPDATE_ALL_LAYERS_URL = 'bg/update bg url for all layers at current page'

/**
   Reducer
*/
export default (state: State = initialState, action: Action) => {
    switch (action.type) {
    case UPDATE_ALL_LAYERS_URL:
        return {
            ...state,
            frontLayers: state.frontLayers.map(l => ({ ...l, imgUrl: action.url })),
            backLayers: state.backLayers.map(l => ({ ...l, imgUrl: action.url })),
        }
    case UPDATE_IS_DREAMSCAPING:
        return {
            ...state,
            isDreamscaping: action.isDreamscaping
        }
    case TRANSLATE_X_LAYERS_BGS: {
            const { progress } = action

            return {
                ...state,
                progress,
            }
    }
        case UPDATE_CACHE_LAYERS:
            return {
                ...state,
                cacheLayers: [
                    {
                        imgUrl: action.cacheLayers,
                        paralax: 0,
                        opacity: 1,
                    }
                ],
            }
        case UPDATE_BACK_LAYERS:
            return {
                ...state,
                backLayers: action.backLayers,
                backLayersPid: action.backLayersPid,
            }
        case UPDATE_FRONT_LAYERS:
            return {
                ...state,
                frontLayers: action.frontLayers,
                frontLayersPid: action.frontLayersPid,
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
