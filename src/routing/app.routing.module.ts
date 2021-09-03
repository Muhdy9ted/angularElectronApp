import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//components imports
import { LoginComponent } from "src/app/desktopUI/login/login.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule{}