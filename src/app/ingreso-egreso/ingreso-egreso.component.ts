import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';


import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.action'
import { setItems, unSetItems } from './ingreso-egreso.actions'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;

  tipo = 'Ingreso';

  cargando: boolean = false;
  cargando$: Subscription;

  constructor(private fb: FormBuilder,
    private ingEgreso: IngresoEgresoService,
    private store: Store<AppState>) {

    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit() {
    this.cargando$ = this.store.select('ui').subscribe(
      ref => this.cargando = ref.isLoading
    );

  }

  toggleIngEgre() {
    this.tipo === 'Ingreso' ? this.tipo = 'Gasto' : this.tipo = "Ingreso"
  }

  guardar() {

    if (this.ingresoEgresoForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    const { description, cantidad } = this.ingresoEgresoForm.value;

    const newIngresoEgreso = new ingresoEgreso(description, cantidad, this.tipo)

    this.ingEgreso.crearIngresoEgreso(newIngresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        // this.store.dispatch(ingresoEgresoAction({ingreso: newIngresoEgreso}))
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado', description, 'success');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error: ', err.message, 'error')
      })
  }

  ngOnDestroy(): void {
    this.cargando$.unsubscribe();
  }
}
