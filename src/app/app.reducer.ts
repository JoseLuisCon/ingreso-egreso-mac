import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as user from "./auth/auth.reducer";
import * as ie from "./ingreso-egreso/ingreso-egreso.reducer"

export interface AppState {
    ui: ui.State,
    user: user.State,
    ingreso: ie.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: user.userReducer,
    ingreso: ie.ingresoEgresoReducer
}