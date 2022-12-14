import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction('[AUTH] setUser', props<{user: Usuario}>());
export const unSetUser = createAction('[AUTH] unSetUser');