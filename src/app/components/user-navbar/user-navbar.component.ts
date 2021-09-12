import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  username: string = "Abdullahi Muhammed"
  constructor() { }

  ngOnInit(): void {
  }

  settings(){
    console.log('settings clicked')
  }

}
