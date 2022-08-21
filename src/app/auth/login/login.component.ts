import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.action';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;

  cargando: boolean;

  cargando$: Subscription;


  loginForm: FormGroup = this.fb.group({
    email: ['condepa@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required]
  })

  constructor(private fb: FormBuilder,
    private serviceAuth: AuthService,
    private store: Store<AppState>,
    private router: Router) { }


  ngOnInit() {
    this.cargando$ = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    })
  }

  login() {

    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    /* Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      },
    }) */

    const { email, password } = this.loginForm.value;



    this.serviceAuth.loginUsuario(email, password).then(
      () => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['']);

      }
    ).catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })

    }
    )
  }


  ngOnDestroy(): void {
    this.cargando$.unsubscribe();

  }


}
