import { createAction, props } from '@ngrx/store';
import { ingresoEgreso } from '../models/ingreso-egreso.models';


export const setItems = createAction('[Ingreso Egreso] Set Items', props<{items: ingresoEgreso[]}>());
export const unSetItems = createAction('[Ingreso Egreso] Unset Items');

