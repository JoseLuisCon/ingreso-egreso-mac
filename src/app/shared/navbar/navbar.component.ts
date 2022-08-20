import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
 nameUser: string;
 subscriptionUser: Subscription;
  
 constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptionUser = this.store.select('user')
    .pipe(
      filter( ({user}) => user!=null
      )
    )
    .subscribe(
      ({user}) => this.nameUser = user.nombre
      
    )
  }

}
