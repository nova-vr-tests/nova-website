// @flow

import type {
    State as AppState,
    Action as AppAction,
} from './reducer/AppTypes.jsx'

import type {
    State as BgState,
    Action as BgAction,
} from './reducer/BgTypes.jsx'

import type {
    State as HeaderState,
    Action as HeaderAction,
} from './reducer/HeaderTypes.jsx'

import type {
    State as SidebarState,
    Action as SidebarAction,
} from './reducer/SidebarTypes.jsx'

export type RouterState = {
    location: {
        pathname: string,
        search: string,
        hash: string,
        key: string,
    }
}

export type State = {
    routing: RouterState,
    appReducer: AppState,
    bgReducer: BgState,
    headerReducer: HeaderState,
    sidebarReducer: SidebarState,
}

export type Action = AppAction
    | BgAction
    | HeaderAction
    | SidebarAction

export type Dispatch = (a: Action) => void

export type Store = {
    getState: () => State,
    dispatch: Dispatch,
}

/**
   RS - Redux State
   RD - Redux Dispatch
*/
export type MapStateToProps<RS> = (state: State) => RS
export type MapDispatchToProps<RD> = (dispatch: Dispatch) => RD
