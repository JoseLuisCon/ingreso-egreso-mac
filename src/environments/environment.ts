// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDBJfltB8nP0RTin202gmjXhomFqbbu9k0",
    authDomain: "ingreso-egreso-app-123.firebaseapp.com",
    projectId: "ingreso-egreso-app-123",
    storageBucket: "ingreso-egreso-app-123.appspot.com",
    messagingSenderId: "830350426193",
    appId: "1:830350426193:web:f14eb32c9114365f7e3870",
    measurementId: "G-VRBEB38H75"
  }
};

/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBJfltB8nP0RTin202gmjXhomFqbbu9k0",
  authDomain: "ingreso-egreso-app-123.firebaseapp.com",
  projectId: "ingreso-egreso-app-123",
  storageBucket: "ingreso-egreso-app-123.appspot.com",
  messagingSenderId: "830350426193",
  appId: "1:830350426193:web:f14eb32c9114365f7e3870",
  measurementId: "G-VRBEB38H75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/* 
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
