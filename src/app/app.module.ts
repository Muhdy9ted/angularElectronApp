import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


//modules imports
import { AppRoutingModule } from '../routing/app.routing.module';
import { MaterialModule } from './material.module';

//components imports
import { LoginComponent } from './desktopUI/login/login.component';
import { ContractsListComponent } from './desktopUI/contracts-list/contracts-list.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ContractDetailsComponent } from './desktopUI/contract-details/contract-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GetContractsResolver } from './_shared/resolvers/getContracts.resolver';
import { GetContractResolver } from './_shared/resolvers/getContract.resolver';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContractsListComponent,
    UserNavbarComponent,
    ContractDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB9_AVA3HD1KeftqzrHzyxsYH6-NxW4qEo",
      authDomain: "gigworks-desktop.firebaseapp.com",
      databaseURL: "gigworks-desktop.firebaseapp.com",
      projectId: "gigworks-desktop",
      storageBucket: "gigworks-desktop.appspot.com",
      messagingSenderId: "1042528354644",
      appId: "1:1042528354644:web:0f2f044622795b0c5008c1",
    }),
    AngularFireDatabaseModule,
    AngularFirestoreModule ,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AngularFirestoreModule,
  ],
  providers: [
    GetContractsResolver,
    GetContractResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
