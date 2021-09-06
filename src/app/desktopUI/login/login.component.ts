import { Component, OnInit, OnDestroy } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, Validators, FormGroup} from '@angular/forms';


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
export class LoginComponent implements OnInit, OnDestroy {
  blacklistEmail: string[] = ['me@you.com']
  loginForm!: FormGroup;
  hide: boolean = true;
  checked: boolean = false;
  destroyed = new Subject<void>();
  currentScreenSize!: string;
  currentScreenSize2!: any;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
    });

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email, this.customEmailValidator.bind(this)], [this.customAsyncEmailValidator.bind(this)]),
      email: new FormControl('', [Validators.required, Validators.email, this.customEmailValidator.bind(this)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rememberMe: new FormControl(this.checked)
    })
    console.log(this.loginForm)
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
  }

  getErrorMessage() {
    // if (this.email.hasError('required')) {
      return 'You must enter an email address';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
