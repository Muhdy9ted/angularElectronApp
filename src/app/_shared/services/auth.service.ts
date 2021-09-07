import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { EmailLogin } from '../models/email-login.mdoel';
import { AuthResponse } from '../models/firebase-auth-response.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseURL = environment.apiUrl + 'auth/';
  authUser: any = null


  constructor(public http: HttpClient, public auth: AngularFireAuth) {
    this.auth.authState.subscribe(authState => {
      this.authUser = authState
      console.log(this.authUser)
    })
   }

  signup(){
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9_AVA3HD1KeftqzrHzyxsYH6-NxW4qEo', {
      email: 'muhammedu9ted@yahoo.com',
      password: 'password',
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  signupDesktop(){
    return this.auth.createUserWithEmailAndPassword('muhammedu9ted@yahoo.com', 'password').then((user)=>{
      this.authUser = user;
    })
  }

  
  emailLogin(formData:EmailLogin ) {
    return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9_AVA3HD1KeftqzrHzyxsYH6-NxW4qEo', 
    {
      email: formData.username,
      password: formData.password, 
      returnSecureToken: true
    }, httpOptions).pipe(catchError(this.handleError))
  }

  onSubmitFacebook(){
    return this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((value: firebase.auth.UserCredential) => {
      console.log(value)
      return value
    }).catch(error => {
      console.log(error)
      return error
    })
  }

  // onfacebook(){
  //   return this.auth.createUserWithEmailAndPassword
  // }

  onSubmitGoogle(){
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((value: firebase.auth.UserCredential) => {
      console.log(value)
      return value
    }).catch(error => {
      console.log(error)
      return error
    })
  }

  onSubmitGoogleDesktop(){
    return this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((value)=>{
      console.log(value)
      return value
    }).catch(error => {
      console.log(error)
      return error
    })
  }

  onSubmitApple(){
    return this.auth.signInWithPopup(new firebase.auth.OAuthProvider('apple.com')).then((value: firebase.auth.UserCredential) => {
      console.log(value)
      return value
    }).catch(error => {
      console.log(error)
      return error
    })
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'this email address is already in use by another account'
      break
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'email-password sign-in is disabled for this application'
      break
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
      break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this login.'
      break
      case 'INVALID_PASSWORD':
        errorMessage = 'There is no user record corresponding to this login.'
      break
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.'
      break
      default: 
        errorMessage = 'An unknown error occured';
    }
    return throwError(errorMessage)
  }
}

