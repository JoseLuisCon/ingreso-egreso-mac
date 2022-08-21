import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import * as ingresoEgresoActions from "./ingreso-egreso.actions";

export interface State {
    items: ingresoEgreso[];
}

export interface AppStateWithIngreso extends AppState{
    ingreso: State;
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setItems, (state, {items}) => ({...state, items: [...items]})),
    on(ingresoEgresoActions.unSetItems, state => ({...state, items: []}))

)

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}