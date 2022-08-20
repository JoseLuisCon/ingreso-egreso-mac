import { createReducer, on } from '@ngrx/store';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import * as ingresoEgresoActions from "./ingreso-egreso.actions";

export interface State {
    items: ingresoEgreso[];
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    /* on(ingresoEgresoActions.setItems, (state, { ingreso }) => {
        let newArray = [];
        state.ingreso.map((i) => {
            newArray.push(i);
        })
        newArray.push(ingreso);
        return { ingreso: newArray };
    }) */
    on(ingresoEgresoActions.setItems, (state, {items}) => ({...state, items: [...items]})),
    on(ingresoEgresoActions.unSetItems, state => ({...state, items: []}))

)

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}