import type {
    State as AppState,
    Action as AppAction,
} from './reducer/App.js'

import type {
    State as BgState,
    Action as BgAction,
} from './reducer/Bg.js'

import type {
    State as HeaderState,
    Action as HeaderAction,
} from './reducer/Header.js'

import type {
    State as SidebarState,
    Action as SidebarAction,
} from './reducer/Sidebar.js'

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
    getState: () => State
}

export type MapStateToProps<RS> = (state: State) => RS
export type MapDispatchToProps<RD> = (dispatch: Dispatch) => RD
