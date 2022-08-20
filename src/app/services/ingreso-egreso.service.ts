import { Injectable } from '@angular/core';

import 'firebase/firestore'
import { AngularFirestore } from '@angular/fire/firestore';
import { ingresoEgreso } from '../models/ingreso-egreso.models';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firebase: AngularFirestore,
    private authService: AuthService) { }

    
    ingresosEgresosListener(uid: string) {
      
      return this.firebase.collection(`${uid}/ingresoEgreso/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map((doc) => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        }))
        ))
      }
      
      
      crearIngresoEgreso(ingresoEgreso: ingresoEgreso) {
        const user = this.authService.user;

        delete ingresoEgreso.uid;
        
        return this.firebase.doc(`${user.uid}/ingresoEgreso`)
          .collection('items')
          .add({ ...ingresoEgreso })
    
      }

      borrarIngresoEgreso(uid: string){
        const user = this.authService.user;
        return this.firebase.doc(`${user.uid}/ingresoEgreso/items/${uid}`).delete()
      
      }
}
