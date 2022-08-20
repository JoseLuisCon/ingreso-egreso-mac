import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import * as authActions from './auth.actions';

export interface State  {
   
    user: Usuario
}

export const initialState: State = {
    user : null
}

const _userReducer = createReducer(initialState,

    on(authActions.setUser, (state, { user }) => ({
        ...state, user: { ...user }
    })
    ),
    on(authActions.unSetUser, state => ({...state, user: null}))

);

export function userReducer(state, action) {
    return _userReducer(state, action);
}