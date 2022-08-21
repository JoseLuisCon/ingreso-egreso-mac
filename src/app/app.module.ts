import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';

//ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';


// * Modulos
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

//!COMPONENTES
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
  
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
    
   ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
