import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {EmailLogin as emailLoginInterface} from '../../_shared/models/email-login.model';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertifyService } from 'src/app/_shared/services/alertify.service';
import { Router } from '@angular/router';


// XSmall	(max-width: 599.98px)
// Small	(min-width: 600px) and (max-width: 959.98px)
// Medium	(min-width: 960px) and (max-width: 1279.98px)
// Large	(min-width: 1280px) and (max-width: 1919.98px)
// XLarge	(min-width: 1920px)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  blacklistEmail: string[] = ['me@you.com']
  loginForm!: FormGroup;
  hide: boolean = true;
  checked: boolean = false;
  user!: emailLoginInterface;
  isLoading: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  error:string|null = null;
  authUser: any = null
  provider: any;

  constructor(private authService: AuthService, public auth: AngularFireAuth, private alertify: AlertifyService,  private router: Router) {}


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email, this.customEmailValidator.bind(this)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rememberMe: new FormControl(this.checked)
    })

    this.auth.authState.subscribe(authState => {
      this.authUser = authState
      console.log(this.authUser)
    })

    // this.authService.signupDesktop().then(
    //   res => {
    //     console.log(res)
    //   },
    //   errorMessage =>{
    //     console.log(errorMessage)
          
    //   }
    // );
  }

  customEmailValidator(control: FormControl): {[s:string]: boolean}|null {
    if(this.blacklistEmail.indexOf(control.value) !== -1){
      return {'isBlacklistEmail': true}
    }
    return null;
  }

  customAsyncEmailValidator(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'isBlacklistEmail': true})
        }else{
          resolve(null)
        }
      },1500)
    })
    return promise;
  }

  onSubmit(){
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      // this.isLoading = true;
      const {username, password} = this.loginForm.value;
      this.user = {username, password}
      this.authService.emailLogin(this.user).subscribe((userCredential) => {
        this.isLoading = false;
        this.authUser = userCredential
        this.alertify.success(`Welcome back ${userCredential.email}`);
        this.router.navigate(['/contract-lists']);
        this.loginForm.reset()
        this.router.navigate(['/', 'contract-lists'])
      },errorMessage => {
        console.log(errorMessage)
        this.alertify.error(`${errorMessage}`);
      })
    }
  }

  onSubmitFacebook(){
    this.authService.onSubmitFacebook().then((value)=>{
      console.log(value)
      // this.alertify.success(`Welcome back`);
    }).catch(error => {
      console.log(error)
    })
  }

  onSubmitGoogle(){
    this.authService.onSubmitGoogle().then((value)=>{
      console.log(value)
      this.router.navigate(['/', 'contract-lists'])
      this.alertify.success(`Welcome back ${value.user.displayName}`);
    }).catch(error => {
      console.log(error)
    })
  }

  onSubmitApple(){
    this.authService.onSubmitApple().then((value)=>{
      this.router.navigate(['/', 'contract-lists'])
      console.log(value)
    }).catch(error => {
      console.log(error)
    })
  }


  
  onLogout(){
    this.auth.signOut().then(res =>{
      console.log(res)
    }).catch(error => {
      console.log(error)
    })

    this.loginForm.reset()
    this.authUser = null
  }
  getErrorMessage() {
    // if (this.email.hasError('required')) {
      return 'You must enter an email address';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
