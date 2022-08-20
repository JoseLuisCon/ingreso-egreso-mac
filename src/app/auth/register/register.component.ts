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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  cargando$: Subscription;

  registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router) { }




  ngOnInit() {
    this.cargando$ = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }

  crearUsuario() {

    if (this.registerForm.invalid) return;

    /* Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      },
    }) */


    const { nombre, email, password } = this.registerForm.value;

    this.store.dispatch(ui.isLoading());
    
    this.authService.crearUsuario(nombre, email, password)
    .then(() => {
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(["/"])
    })
    .catch(err => 
      {
        this.store.dispatch(ui.stopLoading());
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
        
      })

  }

  ngOnDestroy(): void {
    this.cargando$.unsubscribe();
  }
}
