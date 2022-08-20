import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { AppState } from 'src/app/app.reducer'
import { AuthService } from 'src/app/services/auth.service'
import * as auth from '../../auth/auth.actions'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nameUser: string = ''
  subscriptionUser: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.subscriptionUser = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.nameUser = user.nombre))
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }
  singOut() {
    this.authService.logOut().then(() => {
      this.store.dispatch(auth.unSetUser())
      this.router.navigate(['/login'])
      
    })
  }
}
