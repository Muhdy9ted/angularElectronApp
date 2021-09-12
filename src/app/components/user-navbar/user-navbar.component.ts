import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {PopoverModule} from "ngx-smart-popover";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  username: string = ""
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.onAuthStateChanged(authstate => {
      // console.log(authstate)
    })
    let emailUser = localStorage.getItem('firebaseEmailPasswordLogin');
    emailUser = JSON.parse(emailUser)
    // console.log(emailUser)
    let emailUser2:any = emailUser 
    this.auth.authState.subscribe(authState => {
      // console.log(authState)
      if(authState){
        this.username = authState.displayName || authState.email
        // console.log(this.username)
      }else if(emailUser2){
        this.username = emailUser2.displayName || emailUser2.email
      }
    })
   }
  ngOnInit(): void {
  }

  settings(){
    // console.log('settings clicked')
  }

  onLogout(event){
    this.auth.signOut().then(res =>{
      // console.log(res)
    }).catch(error => {
      // console.log(error)
    })
    localStorage.removeItem('firebaseEmailPasswordLogin')
    this.router.navigate(['/login']);
  }

}
