import { Component, OnDestroy, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.reducer'

import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

import { ingresoEgreso } from 'src/app/models/ingreso-egreso.models'
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [ `
  .fuente { font-size: 1.2rem;
            font-weight: 400;}
  `],
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  data: ingresoEgreso[]
  susbcriptionItems: Subscription;
  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) {}

  ngOnInit() {
    this.susbcriptionItems= this.store
      .select('ingreso')
      .pipe(filter((items) => items.items.length != 0))
      .subscribe(({ items }) => (this.data = items))
  }

  ngOnDestroy(): void {
    this.susbcriptionItems.unsubscribe();
  }

  borrar(uid: string){
    console.log(uid);
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then ( (item: any) => {
          Swal.fire('Registro borrado', 'Item borrado' , 'info');

        }).catch( err => Swal.fire('Error', err.message , 'warning'));
  }
}
