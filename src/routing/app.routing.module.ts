import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContractDetailsComponent } from "src/app/desktopUI/contract-details/contract-details.component";
import { ContractsListComponent } from "src/app/desktopUI/contracts-list/contracts-list.component";

//components imports
import { LoginComponent } from "src/app/desktopUI/login/login.component";
import { GetContractResolver } from "src/app/_shared/resolvers/getContract.resolver";
import { GetContractsResolver } from "src/app/_shared/resolvers/getContracts.resolver";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'contract-list', component:  ContractsListComponent },
    {path: 'contract-details/:contractId', component:  ContractDetailsComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})

export class AppRoutingModule{}