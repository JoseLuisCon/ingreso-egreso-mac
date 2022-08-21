import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { AppStateWithIngreso } from '../ingreso-egreso.reducer'

import { ingresoEgreso } from 'src/app/models/ingreso-egreso.models'


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  totalCantidadIngresos = 0
  totalIngresos = 0

  totalCantidadGastos = 0
  totalGastos = 0

  constructor(private store: Store<AppStateWithIngreso>) {}

  ngOnInit() {
    this.store
      .select('ingreso')
      .subscribe(({ items }) => this.generarEstadistica(items))
  }

  generarEstadistica(items: ingresoEgreso[]) {
  this.totalCantidadIngresos = 0
  this.totalIngresos = 0

  this.totalCantidadGastos = 0
  this.totalGastos = 0
  
    items.forEach((items) => {
      switch (items.tipo) {
        case 'Ingreso':
          this.totalCantidadIngresos += items.cantidad
          this.totalIngresos++
          break
        case 'Gasto':
          this.totalCantidadGastos += items.cantidad
          this.totalGastos++
          break
      }
    })
  }

  /**
      **  GRAFICAS
      
      */


    

  public chartClicked({event, active} : {event: MouseEvent, active: {}[]}){
    console.log(event, active);
    
  }
  public chartHovered({event, active} : {event: MouseEvent, active: {}[]}){
    console.log(event, active);
    
  }

}
