import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import * as ie from "../ingreso-egreso/ingreso-egreso.reducer"

import { ChartsModule } from 'ng2-charts';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';

import { OrdenIngresoPipe } from './orden-ingreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
],
imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingreso', ie.ingresoEgresoReducer)
  ],
  exports: [
    
  ]
})
export class IngresoEgresoModule { }