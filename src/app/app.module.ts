import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//modules imports
import { AppRoutingModule } from '../routing/app.routing.module';
import { MaterialModule } from './material.module';

//components imports
import { LoginComponent } from './desktopUI/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB9_AVA3HD1KeftqzrHzyxsYH6-NxW4qEo",
      authDomain: "gigworks-desktop.firebaseapp.com",
      projectId: "gigworks-desktop",
      storageBucket: "gigworks-desktop.appspot.com",
      messagingSenderId: "1042528354644",
      appId: "1:1042528354644:web:0f2f044622795b0c5008c1"
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
