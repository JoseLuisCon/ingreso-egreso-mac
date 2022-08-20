import { Pipe, PipeTransform } from '@angular/core'
import { ingresoEgreso } from '../models/ingreso-egreso.models'

@Pipe({
  name: 'ordenIngreso',
})
export class OrdenIngresoPipe implements PipeTransform {
  
  
  transform(items: ingresoEgreso[]): ingresoEgreso[]  {
    
    if (!items) return [];
    
    return items.slice().sort( (a, b) => {

      if (a.tipo === 'Ingreso'){
        return -1;
      }else {
        return 1;
      }
    })


    
    
  }
}
