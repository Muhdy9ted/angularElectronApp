import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gigworks-desktop';

  minimizeWindow(){
    console.log('minimized')
  }

  maximizeWindow(){
    console.log('maximized')
  }


  closeWindow(){
    console.log('window closed')
  }
}
