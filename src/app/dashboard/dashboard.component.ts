import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { setItems, unSetItems } from '../ingreso-egreso/ingreso-egreso.actions'

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscriptionUser: Subscription;
  private ingresosSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }
  
  ngOnInit() {
    this.subscriptionUser = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null))

      .subscribe( ({user}) => 
       this.ingresosSubs = this.ingresoEgresoService.ingresosEgresosListener(user.uid)
        .subscribe( items => this.store.dispatch(setItems( {items})))
      )
    }

    ngOnDestroy(): void {
      // this.store.dispatch(unSetItems());
      this.subscriptionUser?.unsubscribe();
      this.ingresosSubs?.unsubscribe();
    }

}
